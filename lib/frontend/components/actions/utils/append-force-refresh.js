"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeForceRefresh = exports.hasForceRefresh = exports.appendForceRefresh = exports.REFRESH_KEY = exports.IGNORE_PARAMS_KEY = void 0;
const REFRESH_KEY = 'refresh';
exports.REFRESH_KEY = REFRESH_KEY;
const IGNORE_PARAMS_KEY = 'ignore_params';
/**
 * Adds refresh=true to the url, which in turn should cause list to reload.
 *
 * @param {string} url      url to which function should add `refresh`
 * @param {string} [search] optional search query which should be updated,
 *                          if not given function will use window.location.search
 * @private
 */

exports.IGNORE_PARAMS_KEY = IGNORE_PARAMS_KEY;

const appendForceRefresh = (url, search) => {
  var _ref, _ref2;

  const searchParamsIdx = url.lastIndexOf('?');
  const urlSearchParams = searchParamsIdx !== -1 ? url.substring(searchParamsIdx + 1) : null;
  const oldParams = new URLSearchParams((_ref = (_ref2 = search !== null && search !== void 0 ? search : urlSearchParams) !== null && _ref2 !== void 0 ? _ref2 : window.location.search) !== null && _ref !== void 0 ? _ref : '');
  const shouldIgnoreOldParams = new URLSearchParams(urlSearchParams || '').get(IGNORE_PARAMS_KEY) === 'true';
  const newParams = shouldIgnoreOldParams ? new URLSearchParams('') : new URLSearchParams(oldParams.toString());
  newParams.set(REFRESH_KEY, 'true');
  const newUrl = searchParamsIdx !== -1 ? url.substring(0, searchParamsIdx) : url;
  return `${newUrl}?${newParams.toString()}`;
};

exports.appendForceRefresh = appendForceRefresh;

const hasForceRefresh = search => {
  const params = new URLSearchParams(search);
  return !!params.get(REFRESH_KEY);
};

exports.hasForceRefresh = hasForceRefresh;

const removeForceRefresh = search => {
  const params = new URLSearchParams(search);

  if (params.get(REFRESH_KEY)) {
    params.delete(REFRESH_KEY);
  }

  return params.toString();
};

exports.removeForceRefresh = removeForceRefresh;