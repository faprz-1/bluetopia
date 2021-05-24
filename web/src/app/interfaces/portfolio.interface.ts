import CustomAsset from "./custom-asset.interface";
import PolygonAsset from "./polygon-asset.interface";
import User from "./user.interface";

export default interface Portfolio {
    id: number;
    uuid: string;
    
    user: User;
    userId: number;

    name: string;
    lastUpdated: string;
    sentReminder: boolean;
    shared: boolean;

    assets: PolygonAsset[];
    customAssets: CustomAsset[];
}