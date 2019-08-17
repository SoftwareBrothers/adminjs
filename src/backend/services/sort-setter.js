const ConfigurationError = require('../utils/configuration-error')

const DEFAULT_DIRECTION = 'asc'

/**
 * @typedef {Object} SortParams
 * @property {String} sortBy        name of the property base for the sort
 * @property {String} direction     either `asc` or `desc`
 */

/**
 * Sets sort parameters for a list.
 *
 * @private
 *
 * @param {Object}  query
 * @param {String}  [query.direction]   either `asc` or `desc`
 * @param {String}  [query.sortBy]      sort by field passed in query
 * @param {String}  firstPropertyName   property name which will be taken as a default
 * @param {ResourceOptions} resourceOptions={}  options passed along with given resource
 * @return {SortParams}
 */
const sortSetter = ({ direction, sortBy } = {}, firstPropertyName, resourceOptions = {}) => {
  const options = resourceOptions.sort || {}
  if (resourceOptions
      && resourceOptions.sort
      && resourceOptions.sort.direction
      && !['asc', 'desc'].includes(resourceOptions.sort.direction)) {
    throw new ConfigurationError(`
    Sort direction should be either "asc" or "desc",
    "${resourceOptions.direction} was given"`, 'global.html#ResourceOptions')
  }
  const params = {
    direction: direction || options.direction || DEFAULT_DIRECTION,
    sortBy: sortBy || options.sortBy || firstPropertyName,
  }

  return params
}

sortSetter.DEFAULT_DIRECTION = DEFAULT_DIRECTION

module.exports = sortSetter
