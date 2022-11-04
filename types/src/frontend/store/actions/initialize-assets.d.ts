import { Assets } from '../../../adminjs-options.interface';
export declare const ASSETS_INITIALIZE = "ASSETS_INITIALIZE";
export declare type initializeAssetsResponse = {
    type: string;
    data: Assets;
};
export declare const initializeAssets: (data: Assets) => initializeAssetsResponse;
