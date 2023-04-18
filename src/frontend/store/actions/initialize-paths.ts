import type { PathsInState } from '../reducers/pathsReducer.js'

export const PATHS_INITIALIZE = 'PATHS_INITIALIZE'

export type InitializePathsResponse = {
  type: typeof PATHS_INITIALIZE
  data: PathsInState
}

export const initializePaths = (data: PathsInState): InitializePathsResponse => ({
  type: PATHS_INITIALIZE,
  data,
})
