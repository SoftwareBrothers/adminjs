import { createStore, combineReducers } from 'redux'

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

export const addNotice = (data = {}) => ({
  type: 'ADD_NOTICE',
  data: {
    message: data.message,
    id: data.id || Math.random().toString(36).substr(2, 9),
    type: data.type || 'success',
    progress: 0,
  },
})

export const setNoticeProgress = ({ noticeId, progress }) => ({
  type: 'SET_NOTICE_PROGRESS',
  data: { noticeId, progress },
})

export const dropNotice = noticeId => ({
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

const pathsReducer = (state = {}, action) => {
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

const noticesReducer = (state = [], action) => {
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

const reducer = combineReducers({
  resources: resourcesReducer,
  branding: brandingReducer,
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
  notices: noticesReducer,
  versions: versionsReducer,
})

export default (initialState = {}) => createStore(reducer, initialState)
