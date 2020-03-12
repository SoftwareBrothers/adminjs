/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createStore, combineReducers } from 'redux'
import ResourceJSON from '../../backend/decorators/resource-json.interface'
import { BrandingOptions, VersionProps, AdminPage } from '../../admin-bro-options.interface'
import { CurrentAdmin } from '../../current-admin.interface'
import { DEFAULT_PATHS } from '../../constants'
import { NoticeMessage } from './with-notice'
import PageJSON from '../../backend/decorators/page-json.interface'
import { Locale } from '../../locale/config'

export const initializePages = (data: Array<AdminPage>): {
  type: string; data: Array<AdminPage>;
} => ({
  type: 'PAGES_INITIALIZE',
  data,
})

export const initializeLocale = (data: Locale): {
  type: string; data: Locale;
} => ({
  type: 'LOCALE_INITIALIZE',
  data,
})

export const initializeResources = (data: Array<ResourceJSON>): {
  type: string; data: Array<ResourceJSON>;
} => ({
  type: 'RESOURCES_INITIALIZE',
  data,
})

export type DashboardInState = {
  component?: string;
}

export const initializeDashboard = (data: DashboardInState): {
  type: string;
  data: DashboardInState;
} => ({
  type: 'DASHBOARD_INITIALIZE',
  data,
})

export const initializeBranding = (data: BrandingOptions): {
  type: string;
  data: BrandingOptions;
} => ({
  type: 'BRANDING_INITIALIZE',
  data,
})

export const initializePaths = (data: Paths): {
  type: string;
  data: Paths;
} => ({
  type: 'PATHS_INITIALIZE',
  data,
})

export const initializeVersions = (data: VersionProps): {
  type: string;
  data: VersionProps;
} => ({
  type: 'VERSIONS_INITIALIZE',
  data,
})

export const setCurrentAdmin = (data: CurrentAdmin | null = null) => ({
  type: 'SESSION_INITIALIZE',
  data,
})

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

export const addNotice = (data: NoticeMessage = { message: '' }): {
  type: string;
  data: NoticeMessageInState;
} => ({
  type: 'ADD_NOTICE',
  data: {
    message: data.message,
    id: Math.random().toString(36).substr(2, 9),
    type: data.type || 'success',
    progress: 0,
  },
})

export const setNoticeProgress = ({ noticeId, progress }: {
  noticeId: string;
  progress: number;
}) => ({
  type: 'SET_NOTICE_PROGRESS',
  data: { noticeId, progress },
})

export const dropNotice = (noticeId: string) => ({
  type: 'DROP_NOTICE',
  data: { noticeId },
})

const resourcesReducer = (
  state: Array<ResourceJSON> = [],
  action: {
    type: string;
    data: Array<ResourceJSON>;
  },
) => {
  switch (action.type) {
  case 'RESOURCES_INITIALIZE':
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
  case 'PAGES_INITIALIZE':
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
  case 'LOCALE_INITIALIZE':
    return action.data
  default: return state
  }
}

const brandingReducer = (state = {}, action: {
  type: string;
  data: BrandingOptions;
}) => {
  switch (action.type) {
  case 'BRANDING_INITIALIZE':
    return action.data
  default: return state
  }
}

const pathsReducer = (
  state: Paths = DEFAULT_PATHS,
  action: {type: string; data: Paths},
): Paths => {
  switch (action.type) {
  case 'PATHS_INITIALIZE':
    return action.data
  default: return state
  }
}

const dashboardReducer = (state = {}, action: {
  type: string;
  data: DashboardInState;
}): DashboardInState => {
  switch (action.type) {
  case 'DASHBOARD_INITIALIZE':
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
  case 'SESSION_INITIALIZE':
    return action.data
  default: return state
  }
}

const versionsReducer = (state = {}, action: {
  type: string;
  data: VersionProps;
}) => {
  switch (action.type) {
  case 'VERSIONS_INITIALIZE':
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
  case 'ADD_NOTICE': {
    const notices = [action.data as NoticeMessageInState]
    return notices
  }
  case 'DROP_NOTICE': {
    return state.filter(notice => notice.id !== (action.data as NoticeArgs).noticeId)
  }
  case 'SET_NOTICE_PROGRESS': {
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
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  notices: noticesReducer,
  versions: versionsReducer,
  pages: pagesReducer,
  locale: localesReducer,
})

export default (initialState = {}) => createStore(reducer, initialState)
