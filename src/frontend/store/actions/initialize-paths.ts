import { Paths } from '../store'

export const PATHS_INITIALIZE = 'PATHS_INITIALIZE'

export type InitializePathsResponse = {
  type: typeof PATHS_INITIALIZE;
  data: Paths;
}

export const initializePaths = (data: Paths): InitializePathsResponse => ({
  type: PATHS_INITIALIZE,
  data,
})
