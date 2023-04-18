import { RecordActionParams } from '../../../backend/utils/view-helpers/view-helpers.js'
import { ActionJSON } from '../action/index.js'
import { DifferentActionParams } from '../../hooks/use-action/use-action.types.js'

export const isRecordAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is RecordActionParams => (
  'recordId' in params && action.actionType === 'record'
)
