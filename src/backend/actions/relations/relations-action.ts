import { flat } from '../../../utils/flat'
import { Action, ActionResponse, ActionQueryParameters } from '../action.interface'
import { RecordJSON } from '../../../frontend/interfaces'
import Filter from '../../utils/filter/filter'
import { BaseRecord } from '../../adapters/record'
import sortSetter from '../../services/sort-setter/sort-setter'

/**
 * @implements Action
 * @category Actions
 * @module RelationsAction
 * @description
 * Used to search particular record based on "title" property. It is used by
 * select fields with autocomplete.
 * Uses {@link ShowAction} component to render form
 * @private
 */
export const RelationsAction: Action<RelationsActionResponse> = {
  name: 'relations',
  isVisible: false,
  actionType: 'record',
  /**
   * Search records by query string.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   * @memberof module:SearchAction
   *
   * @return  {Promise<SearchResponse>}  populated record
   * @implements ActionHandler
   */
  handler: async (request, response, context) => {
    const { currentAdmin, resource, _admin } = context
    const { query } = request

    const decorated = resource.decorate()
    const { recordId, relationName } = request.params

    if (!recordId) {
      throw new Error('recordId missing')
    }

    const {
      sortBy,
      direction = 'asc',
      filters = {},
      perPage = 50,
      page = 1,
    } = flat.unflatten(query || {}) as ActionQueryParameters

    const relation = decorated?.relations?.[relationName]

    if (!relation) {
      throw new Error('Relation info missing')
    }

    const targetResource = _admin.findResource(relation.target.resourceId)

    if (relation.relationType === 'one-to-many') {
      if (!relation.target.joinKey) {
        throw new Error('"joinKey" must be defined for one-to-many "target"')
      }
      filters[relation.target.joinKey] = recordId
    }

    const listProperties = targetResource.decorate().getListProperties()
    const firstProperty = listProperties.find((p) => p.isSortable())
    let sort
    if (firstProperty) {
      sort = sortSetter(
        { sortBy, direction },
        firstProperty.name(),
        resource.decorate().options,
      )
    }

    const filter = new Filter(filters, targetResource)
    const rawRecords = await resource.findRelations(
      recordId,
      relation,
      filter,
      {
        limit: perPage,
        offset: (page - 1) * perPage,
        sort,
      },
      context,
    )

    // const targetResourceId = decorated?.options?.relations?.[relationName].referencedResourceId

    // if (!targetResourceId) {
    //   throw new Error('relations not configured')
    // }

    return {
      records: rawRecords.map(
        (record) => new BaseRecord(record, targetResource).toJSON(currentAdmin),
      ),
    }
  },
}

export default RelationsAction

/**
 * Response of a [Search]{@link ApiController#relations} action in the API
 * @memberof module:RelationsAction
 * @alias RelationsResponse
 */
export type RelationsActionResponse = ActionResponse & {
  /**
   * List of records
   */
  records: Array<RecordJSON>;
}
