import type { ResourceJSON } from '../../interfaces/resource-json.interface.js'
import { RESOURCES_INITIALIZE } from '../actions/initialize-resources.js'

export type ResourcesInState = Array<ResourceJSON>

export const resourcesReducer = (
  state: ResourcesInState = [],
  action: {
    type: string
    data: ResourcesInState
  },
) => {
  switch (action.type) {
  case RESOURCES_INITIALIZE:
    return action.data
  default:
    return state
  }
}
