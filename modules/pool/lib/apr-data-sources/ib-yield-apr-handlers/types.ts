export type TokenApr = {
  val: number;
  address: string;
  group?: string;
}

export interface AprHandler {
  readonly group: string;
  getAprs(): Promise<{ [key: string]: number }>;
}