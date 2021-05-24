import Asset from "./asset.interface";

export interface MarketDigest {
  market: string;
  assets: Asset[];
  value: number;
  portion: number;
}