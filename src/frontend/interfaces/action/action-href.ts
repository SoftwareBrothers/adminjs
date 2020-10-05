import { RecordActionParams, ViewHelpers } from '../../../backend/utils/view-helpers'
import { DifferentActionParams } from '../../hooks'
import { ActionJSON } from './action-json.interface'

const h = new ViewHelpers()

export const actionHref = (
  action: ActionJSON,
  params: DifferentActionParams,
  search?: Location['search'],
): string | null => {
  const actionName = action.name

  if (!action.component && !action.hasHandler) {
    return null
  }

  const hrefMap = {
    record: (): string => h.recordActionUrl({
      ...params as RecordActionParams,
      actionName,
      search,
    }),
    resource: (): string => h.resourceActionUrl({
      resourceId: params.resourceId,
      actionName,
      search,
    }),
    bulk: (): string => h.bulkActionUrl({
      ...params,
      actionName,
      search,
    }),
  }
  if (hrefMap[action.actionType]) {
    return hrefMap[action.actionType]()
  }
  throw new Error('"actionType" should be either record, resource or bulk')
}
