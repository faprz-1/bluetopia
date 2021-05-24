import Asset from "./asset.interface";

export default interface PolygonAsset extends Asset {
    ticker: string;
    amount: number;
}