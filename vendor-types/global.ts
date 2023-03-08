import type { Theme } from '@adminjs/design-system'
import type { ReduxState } from '../src/frontend/store'

declare global {
  interface Window {
    REDUX_STATE: ReduxState
    THEME: Theme
  }
}
