import { tokens } from "./tokens";
import { TokenApr } from "./types";

export const fetchAllAprs = async (): Promise<TokenApr[]> => {
  const res = await Promise.all(
    tokens.map(async ({ name, group, fetchFn }) => {
      const fetchedResponse: {[key:string]:number} = await fetchFn()
      return Object.entries(fetchedResponse).map(([address, aprValue]) => ({
        val: aprValue * 0.0001 /*Values come in BPS 10000=>100% */,
        group,
        name,
        address
      }))
    }));
  return res.flat();
}