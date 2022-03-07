"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DEFAULT_DIRECTION = void 0;

var _configurationError = _interopRequireDefault(require("../../utils/errors/configuration-error"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const DEFAULT_DIRECTION = 'asc';
exports.DEFAULT_DIRECTION = DEFAULT_DIRECTION;

/**
 * Sets sort parameters for a list.
 *
 * @private
 *
 * @param {object}  query
 * @param {string}  [query.direction]   either `asc` or `desc`
 * @param {string}  [query.sortBy]      sort by field passed in query
 * @param {string}  firstPropertyName   property name which will be taken as a default
 * @param {ResourceOptions} resourceOptions={}  options passed along with given resource
 * @return {Sort}
 */
const sortSetter = ({
  direction,
  sortBy
} = {}, firstPropertyName, resourceOptions = {}) => {
  const options = resourceOptions.sort || {};

  if (resourceOptions && resourceOptions.sort && resourceOptions.sort.direction && !['asc', 'desc'].includes(resourceOptions.sort.direction)) {
    throw new _configurationError.default(`
    Sort direction should be either "asc" or "desc",
    "${resourceOptions.sort.direction} was given"`, 'global.html#ResourceOptions');
  }

  const computedDirection = direction || options.direction || DEFAULT_DIRECTION;
  const params = {
    direction: computedDirection === 'asc' ? 'asc' : 'desc',
    sortBy: sortBy || options.sortBy || firstPropertyName
  };
  return params;
};

sortSetter.DEFAULT_DIRECTION = DEFAULT_DIRECTION;
var _default = sortSetter;
exports.default = _default;