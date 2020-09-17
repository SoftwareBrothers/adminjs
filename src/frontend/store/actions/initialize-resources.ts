import ResourceJSON from '../../../backend/decorators/resource-json.interface'

export const RESOURCES_INITIALIZE = 'RESOURCES_INITIALIZE'

export const initializeResources = (data: Array<ResourceJSON>): {
  type: string; data: Array<ResourceJSON>;
} => ({
  type: RESOURCES_INITIALIZE,
  data,
})
