import { combineReducers, createStore } from 'redux'
import { VERSIONS_INITIALIZE } from './actions/initialize-versions'
import { SESSION_INITIALIZE } from './actions/set-current-admin'
import { DASHBOARD_INITIALIZE } from './actions/initialize-dashboard'
import { PATHS_INITIALIZE } from './actions/initialize-paths'
import { ASSETS_INITIALIZE } from './actions/initialize-assets'
import { BRANDING_INITIALIZE } from './actions/initialize-branding'
import { LOCALE_INITIALIZE } from './actions/initialize-locale'
import { PAGES_INITIALIZE } from './actions/initialize-pages'
import { RESOURCES_INITIALIZE } from './actions/initialize-resources'
/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { SET_NOTICE_PROGRESS } from './actions/set-notice-progress'
import { DROP_NOTICE } from './actions/drop-notice'
import { ADD_NOTICE } from './actions/add-notice'
import { Assets, BrandingOptions, VersionProps } from '../../admin-bro-options.interface'
import PageJSON from '../types/page-json.interface'
import ResourceJSON from '../types/resource-json.interface'
import { DEFAULT_PATHS } from '../../constants'
import { CurrentAdmin } from '../../current-admin.interface'
import { Locale } from '../../locale/config'
import { NoticeMessage } from './with-notice'

export type DashboardInState = {
  component?: string;
}

export type NoticeMessageInState = NoticeMessage & {
  message: string;
  id: string;
  type: NoticeMessage['type'];
  progress: number;
}

export type Paths = {
  rootPath: string;
  logoutPath: string;
  loginPath: string;
  assetsCDN?: string;
}

const resourcesReducer = (
  state: Array<ResourceJSON> = [],
  action: {
    type: string;
    data: Array<ResourceJSON>;
  },
) => {
  switch (action.type) {
  case RESOURCES_INITIALIZE:
    return action.data
  default: return state
  }
}

const pagesReducer = (
  state: Array<PageJSON> = [],
  action: {
    type: string;
    data: Array<PageJSON>;
  },
) => {
  switch (action.type) {
  case PAGES_INITIALIZE:
    return action.data
  default: return state
  }
}

const localesReducer = (
  state: Locale = { language: 'en', translations: {} } as Locale,
  action: {
    type: string;
    data: Locale;
  },
) => {
  switch (action.type) {
  case LOCALE_INITIALIZE:
    return action.data
  default: return state
  }
}

const brandingReducer = (state = {}, action: {
  type: string;
  data: BrandingOptions;
}) => {
  switch (action.type) {
  case BRANDING_INITIALIZE:
    return action.data
  default: return state
  }
}

const assetsReducer = (state = {}, action: {
  type: string;
  data: Assets;
}) => {
  switch (action.type) {
  case ASSETS_INITIALIZE:
    return action.data
  default: return state
  }
}

const pathsReducer = (
  state: Paths = DEFAULT_PATHS,
  action: {type: string; data: Paths},
): Paths => {
  switch (action.type) {
  case PATHS_INITIALIZE:
    return action.data
  default: return state
  }
}

const dashboardReducer = (state = {}, action: {
  type: string;
  data: DashboardInState;
}): DashboardInState => {
  switch (action.type) {
  case DASHBOARD_INITIALIZE:
    return action.data
  default: return state
  }
}

const sessionReducer = (
  state: CurrentAdmin | null = null,
  action: {
    type: string;
    data: CurrentAdmin | null;
  },
) => {
  switch (action.type) {
  case SESSION_INITIALIZE:
    return action.data
  default: return state
  }
}

const versionsReducer = (state = {}, action: {
  type: string;
  data: VersionProps;
}) => {
  switch (action.type) {
  case VERSIONS_INITIALIZE:
    return {
      admin: action.data.admin,
      app: action.data.app,
    }
  default: return state
  }
}

type NoticeArgs = { noticeId: string; progress: number }

const noticesReducer = (state: Array<NoticeMessageInState> = [], action: {
  type: string;
  data: NoticeMessageInState | NoticeArgs;
}): Array<NoticeMessageInState> => {
  switch (action.type) {
  case ADD_NOTICE: {
    const notices = [action.data as NoticeMessageInState]
    return notices
  }
  case DROP_NOTICE: {
    return state.filter(notice => notice.id !== (action.data as NoticeArgs).noticeId)
  }
  case SET_NOTICE_PROGRESS: {
    return state.map(notice => ({
      ...notice,
      progress: notice.id === (action.data as NoticeArgs).noticeId
        ? action.data.progress
        : notice.progress,
    }))
  }
  default: return state
  }
}

export type ReduxState = {
  resources: Array<ResourceJSON>;
  branding: BrandingOptions;
  assets: Assets;
  paths: Paths;
  session: CurrentAdmin | null;
  dashboard: DashboardInState;
  notices: Array<NoticeMessageInState>;
  versions: VersionProps;
  pages: Array<PageJSON>;
  locale: Locale;
}

const reducer = combineReducers<ReduxState>({
  resources: resourcesReducer,
  branding: brandingReducer,
  assets: assetsReducer,
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  notices: noticesReducer,
  versions: versionsReducer,
  pages: pagesReducer,
  locale: localesReducer,
})

export default (initialState = {}) => createStore(reducer, initialState)
