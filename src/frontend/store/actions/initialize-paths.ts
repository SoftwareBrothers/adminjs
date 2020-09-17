import { Paths } from '../store'

export const PATHS_INITIALIZE = 'PATHS_INITIALIZE'

export const initializePaths = (data: Paths): {
  type: string;
  data: Paths;
} => ({
  type: PATHS_INITIALIZE,
  data,
})
