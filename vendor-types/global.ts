/* eslint-disable @typescript-eslint/no-unused-vars */
import type { Theme } from '@adminjs/design-system'
import type { FC } from 'react'

import type { ReduxState } from '../src/frontend/store/store.js'

declare global {
  interface Window {
    REDUX_STATE: ReduxState
    THEME: Theme
    AdminJS: typeof AdminJS
    THEME_COMPONENTS: Record<string, FC>
  }
}

declare const AdminJS: {
  UserComponents: Record<string, FC>
}
