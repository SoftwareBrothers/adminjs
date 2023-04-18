import { ResourceJSON } from '../../interfaces/index.js'

export const RESOURCES_INITIALIZE = 'RESOURCES_INITIALIZE'

export type InitializeResourcesResponse = {
  type: typeof RESOURCES_INITIALIZE;
  data: Array<ResourceJSON>;
}

export const initializeResources = (data: Array<ResourceJSON>): InitializeResourcesResponse => ({
  type: RESOURCES_INITIALIZE,
  data,
})
