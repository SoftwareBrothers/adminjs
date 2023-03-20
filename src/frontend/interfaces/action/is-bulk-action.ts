import { BulkActionParams } from '../../../backend/utils/view-helpers/view-helpers.js'
import { ActionJSON } from '../action/index.js'
import { DifferentActionParams } from '../../hooks/use-action/use-action.types.js'

export const isBulkAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is BulkActionParams => 'recordIds' in params && action.actionType === 'bulk'
