import { RecordActionParams, ViewHelpers } from '../../../backend/utils/view-helpers'
import { DifferentActionParams } from '../../hooks'
import { ActionJSON } from './action-json.interface'

const h = new ViewHelpers()

export const actionHref = (
  action: ActionJSON,
  params: DifferentActionParams,
): string | null => {
  const actionName = action.name

  if (!action.component && !action.hasHandler) {
    return null
  }

  const hrefMap = {
    record: (): string => h.recordActionUrl({
      ...params as RecordActionParams,
      actionName,
    }),
    resource: (): string => h.resourceActionUrl({
      resourceId: params.resourceId,
      actionName,
    }),
    bulk: (): string => h.bulkActionUrl({
      ...params,
      actionName,
    }),
  }
  if (hrefMap[action.actionType]) {
    return hrefMap[action.actionType]()
  }
  throw new Error('"actionType" should be either record, resource or bulk')
}
