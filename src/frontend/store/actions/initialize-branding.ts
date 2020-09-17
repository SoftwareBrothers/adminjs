import { BrandingOptions } from '../../../admin-bro-options.interface'

export const BRANDING_INITIALIZE = 'BRANDING_INITIALIZE'

export const initializeBranding = (data: BrandingOptions): {
  type: string;
  data: BrandingOptions;
} => ({
  type: BRANDING_INITIALIZE,
  data,
})
