import type { Assets } from '../../../adminjs-options.interface.js'
import { ASSETS_INITIALIZE } from '../actions/initialize-assets.js'

export const assetsReducer = (
  state = {},
  action: {
    type: string
    data: Assets
  },
) => {
  switch (action.type) {
  case ASSETS_INITIALIZE:
    return action.data
  default:
    return state
  }
}
