import { RecordActionParams, ViewHelpers } from '../../../backend/utils/view-helpers/index.js'
import { DifferentActionParams } from '../../hooks/index.js'
import { ActionJSON } from './action-json.interface.js'

const h = new ViewHelpers()

export const actionHref = (
  action: ActionJSON,
  params: DifferentActionParams,
): string | null => {
  const actionName = action.name

  if (!action.component && !action.hasHandler) {
    return null
  }

  if (params.recordIds?.length) {
    params.recordIds = [...new Set(params.recordIds)]
  }

  const hrefMap = {
    record: (): string => h.recordActionUrl({
      ...params as RecordActionParams,
      actionName,
    }),
    resource: (): string => h.resourceActionUrl({
      resourceId: params.resourceId,
      actionName,
      search: params.search,
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
