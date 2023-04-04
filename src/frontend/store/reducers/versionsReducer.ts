import { VersionProps } from '../../../adminjs-options.interface.js'
import { VERSIONS_INITIALIZE } from '../actions/initialize-versions.js'

export const versionsReducer = (
  state = {},
  action: {
    type: string;
    data: VersionProps;
  },
) => {
  switch (action.type) {
  case VERSIONS_INITIALIZE:
    return {
      admin: action.data.admin,
      app: action.data.app,
    }
  default:
    return state
  }
}
