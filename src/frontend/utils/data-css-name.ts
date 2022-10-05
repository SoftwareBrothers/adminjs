import { ActionJSON, ResourceJSON } from '../interfaces'

export const getResourceElementCss = (resource: ResourceJSON, suffix: string) => `${resource.id}-${suffix}`

export const getActionElementCss = (resource: ResourceJSON, action: ActionJSON, suffix: string) => `${resource.id}-${action.name}-${suffix}`
