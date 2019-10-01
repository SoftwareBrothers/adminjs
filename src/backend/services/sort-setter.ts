import ConfigurationError from '../utils/configuration-error'
import { ResourceOptions } from '../decorators/resource-options.interface'

const DEFAULT_DIRECTION = 'asc'

/**
 * @typedef {Object} SortParams
 * @property {String} sortBy        name of the property base for the sort
 * @property {String} direction     either `asc` or `desc`
 */

type Sort = {
  direction?: 'asc' | 'desc';
  sortBy?: string;
}

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
const sortSetter = (
  { direction, sortBy }: Sort = {},
  firstPropertyName: string,
  resourceOptions: ResourceOptions = {},
): Sort => {
  const options = resourceOptions.sort || {} as Sort
  if (resourceOptions
      && resourceOptions.sort
      && resourceOptions.sort.direction
      && !['asc', 'desc'].includes(resourceOptions.sort.direction)) {
    throw new ConfigurationError(`
    Sort direction should be either "asc" or "desc",
    "${resourceOptions.sort.direction} was given"`, 'global.html#ResourceOptions')
  }
  const computedDirection = direction || options.direction || DEFAULT_DIRECTION
  const params = {
    direction: computedDirection === 'asc' ? 'asc' : 'desc' as 'asc' | 'desc',
    sortBy: sortBy || options.sortBy || firstPropertyName,
  }

  return params
}

sortSetter.DEFAULT_DIRECTION = DEFAULT_DIRECTION

export { DEFAULT_DIRECTION }

export default sortSetter
