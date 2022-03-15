import { AdminJSOptions, BrandingOptions } from '../../../adminjs-options.interface'

export const BRANDING_INITIALIZE = 'BRANDING_INITIALIZE'
export const AVAILABLE_BRANDINGS_INITIALIZE = 'AVAILABLE_BRANDINGS_INITIALIZE'
export const BRANDING_CHANGE = 'BRANDING_CHANGE'

export type InitializeBrandingResponse = {
  type: typeof BRANDING_INITIALIZE
  data: BrandingOptions
}

export const initializeBranding = (data: BrandingOptions): InitializeBrandingResponse => ({
  type: BRANDING_INITIALIZE,
  data,
})

export type InitializeAvailableBrandingsResponse = {
  type: typeof AVAILABLE_BRANDINGS_INITIALIZE
  data: AdminJSOptions['availableBrandings']
}

export const initializeAvailableBrandings = (data: AdminJSOptions['availableBrandings']): InitializeAvailableBrandingsResponse => ({
  type: AVAILABLE_BRANDINGS_INITIALIZE,
  data,
})

export type ChangeBrandingResponse = {
  type: typeof BRANDING_CHANGE
  data: BrandingOptions
}

export const changeBranding = (data: BrandingOptions): ChangeBrandingResponse => ({
  type: BRANDING_CHANGE,
  data,
})
