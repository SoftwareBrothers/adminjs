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

export const initializeSession = (data = {}) => ({
  type: 'SESSION_INITIALIZE',
  data,
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

const sessionReducer = (state = {}, action) => {
  switch (action.type) {
  case 'SESSION_INITIALIZE':
    return action.data
  default: return state
  }
}

const reducer = combineReducers({
  resources: resourcesReducer,
  branding: brandingReducer,
  paths: pathsReducer,
  session: sessionReducer,
  dashboard: dashboardReducer,
})

export default (initialState = {}) => createStore(reducer, initialState)
