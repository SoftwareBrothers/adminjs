import type { BrandingOptions } from '../../../adminjs-options.interface.js'
import { BRANDING_INITIALIZE } from '../actions/initialize-branding.js'

export const brandingReducer = (
  state = {},
  action: {
    type: string
    data: BrandingOptions
  },
) => {
  switch (action.type) {
  case BRANDING_INITIALIZE:
    return action.data
  default:
    return state
  }
}
