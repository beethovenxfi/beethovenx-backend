export type TokenApr = {
  val: number;
  address: string;
  group?: string;
}

export interface AprHandler {
  readonly group: string | undefined;
  getAprs(): Promise<{ [key: string]: number }>;
}