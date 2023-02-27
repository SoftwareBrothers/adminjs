import AdminJS from './types/src/index.js'

import { ReduxState } from './types/src/frontend/store/store.js'

export * from './types/src/index.js'

export {
  AdminJS as default,
  ReduxState,
}

declare const REDUX_STATE: ReduxState
