/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { combineReducers, createStore } from 'redux'
import type { useLocation } from 'react-router'
import {
  VERSIONS_INITIALIZE,
  SESSION_INITIALIZE,
  DASHBOARD_INITIALIZE,
  PATHS_INITIALIZE,
  ASSETS_INITIALIZE,
  BRANDING_INITIALIZE,
  LOCALE_INITIALIZE,
  PAGES_INITIALIZE,
  RESOURCES_INITIALIZE,
  SET_NOTICE_PROGRESS,
  DROP_NOTICE,
  ADD_NOTICE,
  ROUTE_CHANGED,
  INITIAL_ROUTE } from './actions'

import { Assets, BrandingOptions, VersionProps } from '../../adminjs-options.interface'
import { PageJSON, ResourceJSON } from '../interfaces'
import { DEFAULT_PATHS } from '../../constants'
import { CurrentAdmin } from '../../current-admin.interface'
import { Locale } from '../../locale/config'
import { NoticeMessage } from '../hoc/with-notice'

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

export type RouterProps = {
  from: Partial<ReturnType<typeof useLocation>>;
  to: Partial<ReturnType<typeof useLocation>>;
}

const routerReducer = (state: RouterProps = { from: {}, to: {} }, action: {
  type: string;
  data: any;
}) => {
  switch (action.type) {
  case INITIAL_ROUTE:
    return {
      ...state,
      from: { ...action.data },
    }
  case ROUTE_CHANGED:
    return {
      from: { ...state.to },
      to: { ...action.data },
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
  router: RouterProps;
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
  router: routerReducer,
})

export default (initialState = {}) => createStore(reducer, initialState)
