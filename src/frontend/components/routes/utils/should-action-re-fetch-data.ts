import { RecordActionParams, BulkActionParams, ResourceActionParams } from '../../../../backend/utils/view-helpers/view-helpers'

type AnyActionParams = RecordActionParams & ResourceActionParams & BulkActionParams

/**
 * Indicates if route action should be updated, meaning whether it should fetch
 * new data from the backend.
 * @private
 *
 * @param {AnyActionParams} currentMatchParams
 * @param {AnyActionParams} newMatchParams
 * @return  {boolean}
 */
const shouldActionReFetchData = (
  currentMatchParams: Partial<AnyActionParams>,
  newMatchParams: Partial<AnyActionParams>,
): boolean => {
  const {
    resourceId,
    recordId,
    actionName,
  } = currentMatchParams
  const {
    resourceId: newResourceId,
    recordId: newRecordId,
    actionName: newActionName,
  } = newMatchParams

  return resourceId !== newResourceId
    || recordId !== newRecordId
    || actionName !== newActionName
}

export default shouldActionReFetchData
