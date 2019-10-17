/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { createStore, combineReducers } from 'redux'
import ResourceJSON from '../../backend/decorators/resource-json.interface'
import { BrandingOptions, VersionProps } from '../../admin-bro-options.interface'
import { CurrentAdmin } from '../../current-admin.interface'
import { DEFAULT_PATHS } from '../../constants'

export const initializeResources = data => ({
  type: 'RESOURCES_INITIALIZE',
  data,
})

export const initializeDashboard = data => ({
  type: 'DASHBOARD_INITIALIZE',
  data,
})

export const initializeBranding = data => ({
  type: 'BRANDING_INITIALIZE',
  data,
})

export const initializePaths = data => ({
  type: 'PATHS_INITIALIZE',
  data,
})

export const initializeVersions = data => ({
  type: 'VERSIONS_INITIALIZE',
  data,
})

export const initializeSession = (data = {}) => ({
  type: 'SESSION_INITIALIZE',
  data,
})

export enum NoticeType {
  success = 'success',
  error = 'error',
}

export type NoticeMessage = {
  message: string;
  type?: NoticeType;
}

export type NoticeMessageInState = NoticeMessage & {
  message: string;
  id: string;
  type: NoticeType;
  progress: number;
}

export type Paths = {
  rootPath: string;
  logoutPath: string;
  loginPath: string;
}

export const addNotice = (data: NoticeMessage = { message: '' }) => ({
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

const resourcesReducer = (state = [], action) => {
  switch (action.type) {
  case 'RESOURCES_INITIALIZE':
    return action.data
  default: return state
  }
}

const brandingReducer = (state = {}, action) => {
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

const dashboardReducer = (state = {}, action) => {
  switch (action.type) {
  case 'DASHBOARD_INITIALIZE':
    return action.data
  default: return state
  }
}

const sessionReducer = (state = null, action) => {
  switch (action.type) {
  case 'SESSION_INITIALIZE':
    return action.data
  default: return state
  }
}

const versionsReducer = (state = {}, action) => {
  switch (action.type) {
  case 'VERSIONS_INITIALIZE':
    return {
      admin: action.data.admin,
      app: action.data.app,
    }
  default: return state
  }
}

const noticesReducer = (state: Array<NoticeMessageInState> = [], action) => {
  switch (action.type) {
  case 'ADD_NOTICE': {
    const notices = [action.data]
    return notices
  }
  case 'DROP_NOTICE': {
    return state.filter(notice => notice.id !== action.data.noticeId)
  }
  case 'SET_NOTICE_PROGRESS': {
    return state.map(notice => ({
      ...notice,
      progress: notice.id === action.data.noticeId ? action.data.progress : notice.progress,
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
  dashboard: {
    component?: string;
  };
  notices: Array<NoticeMessageInState>;
  versions: VersionProps;
}

const reducer = combineReducers<ReduxState>({
  resources: resourcesReducer,
  branding: brandingReducer,
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  notices: noticesReducer,
  versions: versionsReducer,
})

export default (initialState = {}) => createStore(reducer, initialState)
