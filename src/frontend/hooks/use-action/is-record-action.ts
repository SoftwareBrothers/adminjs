import { RecordActionParams } from '../../../backend/utils/view-helpers/view-helpers'
import { ActionJSON } from '../../interfaces'
import { DifferentActionParams } from './use-action.types'

export const isRecordAction = (
  params: DifferentActionParams,
  action: ActionJSON,
): params is RecordActionParams => 'recordId' in params && action.actionType === 'record'
