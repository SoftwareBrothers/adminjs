// Note: We are using legacy "createStore"
import { composeWithDevToolsDevelopmentOnly } from '@redux-devtools/extension'
import { combineReducers, legacy_createStore as createStore } from 'redux'

import type { Assets, BrandingOptions, VersionProps } from '../../adminjs-options.interface.js'
import {
  assetsReducer,
  brandingReducer,
  dashboardReducer,
  drawerReducer,
  filterDrawerReducer,
  localesReducer,
  modalReducer,
  noticesReducer,
  pagesReducer,
  pathsReducer,
  resourcesReducer,
  routerReducer,
  sessionReducer,
  themeReducer,
  versionsReducer,
  type DashboardInState,
  type DrawerInState,
  type FilterDrawerInState,
  type LolcaleInState,
  type ModalInState,
  type NoticesInState,
  type PagesInState,
  type PathsInState,
  type ResourcesInState,
  type RouterInState,
  type SessionInState,
  type ThemeInState,
} from './reducers/index.js'

export type ReduxState = {
  assets: Assets
  branding: BrandingOptions
  dashboard: DashboardInState
  drawer: DrawerInState
  filterDrawer: FilterDrawerInState
  locale: LolcaleInState
  modal: ModalInState
  notices: NoticesInState
  pages: PagesInState
  paths: PathsInState
  resources: ResourcesInState
  router: RouterInState
  session: SessionInState
  theme?: ThemeInState
  versions: VersionProps
}

const reducer = combineReducers<ReduxState>({
  assets: assetsReducer,
  branding: brandingReducer,
  dashboard: dashboardReducer,
  drawer: drawerReducer,
  filterDrawer: filterDrawerReducer,
  locale: localesReducer,
  modal: modalReducer,
  notices: noticesReducer,
  pages: pagesReducer,
  paths: pathsReducer,
  resources: resourcesReducer,
  router: routerReducer,
  session: sessionReducer,
  theme: themeReducer,
  versions: versionsReducer,
})

export default (initialState = {}) => createStore(
  reducer,
  initialState,
  composeWithDevToolsDevelopmentOnly(),
)
