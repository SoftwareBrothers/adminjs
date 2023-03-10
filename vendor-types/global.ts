import type { Theme } from '@adminjs/design-system'
import type { FC } from 'react'
import type { ReduxState } from '../src/frontend/store'

declare global {
  interface Window {
    REDUX_STATE: ReduxState
    THEME: Theme
  }
}

declare const AdminJS: {
  UserComponents: Record<string, FC>
}
