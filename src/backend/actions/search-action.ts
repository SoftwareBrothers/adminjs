import Action, { ActionResponse } from './action.interface'
import RecordJSON from '../decorators/record-json.interface'
import Filter from '../utils/filter'

/**
 * @implements Action
 * @category Actions
 * @module SearchAction
 * @description
 * Used to search particular record based on "title" property. It is used by
 * select fields with autocomplete.
 * Uses {@link ShowAction} component to render form
 * @private
 */
const SearchAction: Action<SearchActionResponse> = {
  name: 'search',
  isVisible: false,
  actionType: 'resource',
  /**
   * Search records by query string.
   *
   * To invoke this action use {@link ApiClient#resourceAction}
   * @memberof module:SearchAction
   *
   * @return  {Promise<SearchResponse>}  populated record
   * @implements ActionHandler
   */
  handler: async (request, response, data) => {
    const { currentAdmin, resource } = data

    const queryString = request.params && request.params.query
    const decorated = resource.decorate()
    const titlePropertyName = decorated.titleProperty().name()

    const filters = queryString ? { [titlePropertyName]: queryString } : {}
    const filter = new Filter(filters, resource)

    const sortBy = decorated.options?.sort?.sortBy || titlePropertyName
    const records = await resource.find(filter, {
      limit: 50,
      sort: {
        sortBy,
        direction: 'asc',
      },
    })

    return {
      records: records.map(record => record.toJSON(currentAdmin)),
    }
  },
}

export default SearchAction

/**
 * Response of a [Search]{@link ApiController#search} action in the API
 * @memberof module:SearchAction
 * @alias SearchResponse
 */
export type SearchActionResponse = ActionResponse & {
  /**
   * List of records
   */
  records: Array<RecordJSON>;
}
