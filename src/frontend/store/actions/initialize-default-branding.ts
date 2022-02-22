import { Branding } from '../../../backend/adapters/branding';

export const DEFAULT_BRANDING_INITIALIZE = 'DEFAULT_BRANDING_INITIALIZE';

export type InitializeDefaultBrandingResponse = {
  type: typeof DEFAULT_BRANDING_INITIALIZE;
  data: Branding;
};

export const initializeDefaultBranding = (
  data: Branding
): InitializeDefaultBrandingResponse => ({
  type: DEFAULT_BRANDING_INITIALIZE,
  data,
});

