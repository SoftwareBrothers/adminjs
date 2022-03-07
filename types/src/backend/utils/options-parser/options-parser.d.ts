import AdminJS from "../../../adminjs";
import { CurrentAdmin } from "../../../current-admin.interface";
import { BrandingOptions, Assets } from "../../../adminjs-options.interface";
export declare const getAssets: (admin: AdminJS, currentAdmin?: CurrentAdmin | undefined) => Promise<Assets>;
export declare const getBranding: (admin: AdminJS, currentAdmin?: CurrentAdmin | undefined) => Promise<BrandingOptions>;
export declare const getFaviconFromBranding: (branding: BrandingOptions) => string;
