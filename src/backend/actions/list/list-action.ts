import * as flat from 'flat'
import { Action, ActionResponse } from '../action.interface'
import sortSetter from '../../services/sort-setter/sort-setter'
import Filter from '../../utils/filter/filter'
import populator from '../../utils/populator/populator'
import { RecordJSON } from '../../../frontend/interfaces'

const PER_PAGE_LIMIT = 500

/**
 * @implements Action
 * @category Actions
 * @module ListAction
 * @description
 * Returns selected Records in a list form
 * @private
 */
export const ListAction: Action<ListActionResponse> = {
  name: 'list',
  isVisible: true,
  actionType: 'resource',
  showFilter: true,
  showInDrawer: false,
  /**
   * Responsible for returning data for all records.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @implements Action#handler
   * @memberof module:ListAction
   * @return {Promise<ListActionResponse>} records with metadata
   */
  handler: async (request, response, context) => {
    const { query } = request
    const { sortBy, direction, filters = {} } = flat.unflatten(query || {})
    const { resource } = context
    let { page, perPage } = flat.unflatten(query || {})

    if (perPage) {
      perPage = +perPage > PER_PAGE_LIMIT ? PER_PAGE_LIMIT : +perPage
    } else {
      perPage = context._admin.options.settings?.defaultPerPage ?? 10
    }
    page = Number(page) || 1

    const listProperties = resource.decorate().getListProperties()
    const firstProperty = listProperties.find(p => p.isSortable())
    let sort
    if (firstProperty) {
      sort = sortSetter(
        { sortBy, direction },
        firstProperty.name(),
        resource.decorate().options,
      )
    }

    const filter = await new Filter(filters, resource).populate()

    const records = await resource.find(filter, {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort,
    })
    const populatedRecords = await populator(records)

    // eslint-disable-next-line no-param-reassign
    context.records = populatedRecords

    const total = await resource.count(filter)
    return {
      meta: {
        total,
        perPage,
        page,
        direction: sort?.direction,
        sortBy: sort?.sortBy,
      },
      records: populatedRecords.map(r => r.toJSON(context.currentAdmin)),
    }
  },
}

export default ListAction

/**
 * Response returned by List action
 * @memberof module:ListAction
 * @alias ListAction
 */
export type ListActionResponse = ActionResponse & {
  /**
   * Paginated collection of records
   */
  records: Array<RecordJSON>;
  /**
   * Pagination metadata
   */
  meta: {
    page: number;
    perPage: number;
    direction: 'asc' | 'desc';
    sortBy: string;
    total: number;
  };
}
