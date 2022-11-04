import { BrandingOptions } from '../../../adminjs-options.interface';
export declare const BRANDING_INITIALIZE = "BRANDING_INITIALIZE";
export declare type InitializeBrandingResponse = {
    type: typeof BRANDING_INITIALIZE;
    data: BrandingOptions;
};
export declare const initializeBranding: (data: BrandingOptions) => InitializeBrandingResponse;
