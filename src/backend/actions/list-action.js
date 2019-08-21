const { unflatten } = require('flat')
const sortSetter = require('../services/sort-setter')
const Filter = require('../utils/filter')
const { populator } = require('../utils/populator')

const PER_PAGE_LIMIT = 500

/**
 * @typedef {Object} ApiController~ResourceResponse
 * @property {Array<BaseRecord~JSON>} records
 * @property {Object}                 meta
 * @property {Number}                 meta.page
 * @property {Number}                 meta.perPage
 * @property {String}                 meta.direction
 * @property {String}                 meta.sortBy
 * @property {Number}                 meta.total
 *
 */

/**
 * @implements Action
 * @category Actions
 * @module ListAction
 * @description
 * Retruns selected Records in a list
 */
module.exports = {
  name: 'list',
  isVisible: true,
  actionType: 'resource',
  showFilter: true,
  label: 'All records',
  /**
   * Responsible for returning data for all records.
   *
   * To invoke this action use {@link ApiClient#recordAction}
   *
   * @implements Action.handler
   * @return {ApiController~ResourceResponse} records with metadata
   */
  handler: async (request, response, data) => {
    const { query } = request
    const { sortBy, direction, filters = {} } = unflatten(query || {})
    const { resource } = data
    let { page, perPage } = unflatten(query || {})

    const listProperties = resource.decorate().getListProperties()

    if (perPage) {
      perPage = +perPage > PER_PAGE_LIMIT ? PER_PAGE_LIMIT : +perPage
    } else {
      perPage = 10 // default
    }
    page = Number(page) || 1
    const sort = sortSetter(
      { sortBy, direction },
      listProperties[0].name(),
      resource.decorate().options,
    )

    const filter = await new Filter(filters, resource).populate()

    const records = await resource.find(filter, {
      limit: perPage,
      offset: (page - 1) * perPage,
      sort,
    })
    let populatedRecords = await populator(records, listProperties)
    populatedRecords = await resource.decorate().recordsDecorator(
      populatedRecords.map(r => r.toJSON()),
    )

    const total = await resource.count(filter)
    return {
      meta: {
        total,
        perPage,
        page,
        direction: sort.direction,
        sortBy: sort.sortBy,
      },
      records: populatedRecords,
    }
  },
}
