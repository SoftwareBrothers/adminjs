import AdminJS from '../../../adminjs';
import { Assets, BrandingOptions } from '../../../adminjs-options.interface';
import { CurrentAdmin } from '../../../current-admin.interface';
export declare const getAssets: (admin: AdminJS, currentAdmin?: CurrentAdmin) => Promise<Assets>;
export declare const getBranding: (admin: AdminJS, currentAdmin?: CurrentAdmin) => Promise<BrandingOptions>;
export declare const getFaviconFromBranding: (branding: BrandingOptions) => string;
