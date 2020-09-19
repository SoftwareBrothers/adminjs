import { BrandingOptions } from '../../../admin-bro-options.interface'

export const BRANDING_INITIALIZE = 'BRANDING_INITIALIZE'

export type InitializeBrandingResponse = {
  type: typeof BRANDING_INITIALIZE;
  data: BrandingOptions;
}

export const initializeBranding = (data: BrandingOptions): InitializeBrandingResponse => ({
  type: BRANDING_INITIALIZE,
  data,
})
