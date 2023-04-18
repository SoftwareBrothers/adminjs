import type { PageJSON } from '../../interfaces/page-json.interface.js'
import { PAGES_INITIALIZE } from '../actions/initialize-pages.js'

export type PagesInState = Array<PageJSON>

export const pagesReducer = (
  state: PagesInState = [],
  action: {
    type: string
    data: PagesInState
  },
) => {
  switch (action.type) {
  case PAGES_INITIALIZE:
    return action.data
  default:
    return state
  }
}
