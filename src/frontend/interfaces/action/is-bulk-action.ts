import { BulkActionParams } from '../../../backend/utils/view-helpers/view-helpers'
import { ActionJSON } from '..'
import { DifferentActionParams } from '../../hooks/use-action/use-action.types'

export const isBulkAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is BulkActionParams => 'recordIds' in params && action.actionType === 'bulk'
