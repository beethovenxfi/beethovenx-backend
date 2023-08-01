import { AprHandler, TokenApr } from "./types";
import { aprHandlers } from "./sources";

export class IbYieldAprHandlers {
  
  private handlers: AprHandler[] = [];
  constructor(network: number) {
    this.handlers = aprHandlers.filter((handler) => handler.network === network);
  }
  
   async getHandlersAprs (): Promise<TokenApr[]>  {
    const aprPromises = this.handlers.map(async (handler) => {
      const fetchedResponse: { [key: string]: number } = await handler.getAprs()
      return Object.entries(fetchedResponse).map(([address, aprValue]) => ({
        val: aprValue,
        group: handler.group,
        address
      }))
    });
    const res = Array(this.handlers.length)
    for (const [index, aprPromise] of aprPromises.entries()) {
      res[index] = await aprPromise
    }
    return res.flat();
  }
}