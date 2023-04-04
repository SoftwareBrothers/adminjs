import { DEFAULT_PATHS } from '../../../constants.js'
import { PATHS_INITIALIZE } from '../actions/initialize-paths.js'

export type PathsInState = {
  rootPath: string;
  logoutPath: string;
  loginPath: string;
  assetsCDN?: string;
};

export const pathsReducer = (
  state: PathsInState = DEFAULT_PATHS,
  action: {
    type: string;
    data: PathsInState;
  },
): PathsInState => {
  switch (action.type) {
  case PATHS_INITIALIZE:
    return action.data
  default:
    return state
  }
}
