import { ResourceActionParams } from '../../../backend/utils/view-helpers/view-helpers'
import { ActionJSON } from '../../interfaces'
import { DifferentActionParams } from './use-action.types'

export const isResourceAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is ResourceActionParams => 'recordIds' in params && action.actionType === 'resource'
