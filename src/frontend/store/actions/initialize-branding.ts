import { BrandingOptions } from '../../../adminjs-options.interface'


export const BRANDING_INITIALIZE = 'BRANDING_INITIALIZE'
export const AVAILABLE_BRANDING_INITIALIZE = 'AVAILABLE_BRANDING_INITIALIZE'
export const BRANDING_CHANGE = 'BRANDING_CHANGE'

export type InitializeBrandingResponse = {
  type: typeof BRANDING_INITIALIZE;
  data: BrandingOptions;
}

export const initializeBranding = (data: BrandingOptions): InitializeBrandingResponse => ({
  type: BRANDING_INITIALIZE,
  data,
})

export type InitializeAvailableBrandingResponse = {
  type: typeof AVAILABLE_BRANDING_INITIALIZE;
  data: BrandingOptions[];
}

export const initializeAvailableBrandings = (data: BrandingOptions[]): InitializeAvailableBrandingResponse => ({
  type: AVAILABLE_BRANDING_INITIALIZE,
  data,
})

export type ChangeBrandingResponse = {
  type: typeof BRANDING_CHANGE;
  data: BrandingOptions;
}

export const changeBranding = (data: BrandingOptions): ChangeBrandingResponse => ({
  type: BRANDING_CHANGE,
  data,
})

