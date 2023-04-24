import {
  CLOSE_FILTER_DRAWER,
  OPEN_FILTER_DRAWER,
  type FilterDrawerAction,
} from '../actions/filter-drawer.js'

export type FilterDrawerInState = ReturnType<typeof filterDrawerReducer>

const initialState = {
  isVisible: false,
}

export const filterDrawerReducer = (state = initialState, action: FilterDrawerAction) => {
  switch (action.type) {
  case OPEN_FILTER_DRAWER: {
    return { ...state, isVisible: action.isVisible }
  }
  case CLOSE_FILTER_DRAWER: {
    return { ...state, isVisible: action.isVisible }
  }
  default: {
    return state
  }
  }
}
