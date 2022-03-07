"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mergeResourceOptions = exports.buildFeature = void 0;

var _uniq = _interopRequireDefault(require("lodash/uniq"));

var _merge = _interopRequireDefault(require("lodash/merge"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function mergeActionHooks(key, oldHook, newHook) {
  let hooks = [];

  if (oldHook) {
    if (Array.isArray(oldHook)) {
      hooks = [...hooks, ...oldHook];
    } else if (oldHook) {
      hooks = [...hooks, oldHook];
    }
  }

  if (newHook) {
    if (Array.isArray(newHook)) {
      hooks = [...hooks, ...newHook];
    } else if (newHook) {
      hooks = [...hooks, newHook];
    }
  }

  return hooks.length ? {
    [key]: hooks
  } : {};
}

const basicOptions = ['id', 'href', 'parent', 'sort', 'navigation'];
const listOptions = ['listProperties', 'showProperties', 'editProperties', 'filterProperties'];
// The following check is done in typescript to ensure that the `basicOptions` and `listOptions`
// contains all the keys from ResourceOptions (+ actions and properties) which are copied
// separately. If type MissingKeys has any key following condition is not meet and typescript
// throws an error.
// eslint-disable-next-line @typescript-eslint/no-unused-vars
const hasMissingKeys = {};
/**
 * @name mergeResourceOptions
 * @function
 * @description
 * Merges 2 ResourceOptions together. Used by features
 *
 * - 'id', 'href', 'parent', 'sort' from `newOptions` override `oldOptions`
 * - 'listProperties', 'showProperties', 'editProperties', 'filterProperties'
 *   are joined and made unique
 * - all 'properties' from `newOptions` override properties from `oldOptions`
 * - all 'actions' with their parameters from `newOptions` override `oldOptions`
 *   except hooks and handler - which are chained.
 *
 * @param   {ResourceOptions}  oldOptions
 * @param   {ResourceOptions}  newOptions
 *
 * @return  {ResourceOptions}
 */

const mergeResourceOptions = (oldOptions = {}, newOptions = {}) => {
  const options = _objectSpread({}, oldOptions);

  basicOptions.forEach(propName => {
    if (propName in newOptions) {
      options[propName] = newOptions[propName];
    }
  });
  listOptions.forEach(propName => {
    if (propName in newOptions) {
      const mergedOptions = [...(oldOptions && propName in oldOptions ? oldOptions[propName] : []), ...(newOptions && propName in newOptions ? newOptions[propName] : [])];
      options[propName] = (0, _uniq.default)(mergedOptions);
    }
  });

  if (oldOptions.properties || newOptions.properties) {
    options.properties = (0, _merge.default)({}, oldOptions.properties, newOptions.properties);
  }

  if (oldOptions.actions || newOptions.actions) {
    options.actions = Object.keys(newOptions.actions || {}).reduce((memo, actionName) => {
      const action = (newOptions.actions || {})[actionName];
      const oldAction = memo[actionName];
      return _objectSpread(_objectSpread({}, memo), {}, {
        [actionName]: _objectSpread(_objectSpread(_objectSpread(_objectSpread(_objectSpread({}, memo[actionName]), action), mergeActionHooks('before', oldAction === null || oldAction === void 0 ? void 0 : oldAction.before, action === null || action === void 0 ? void 0 : action.before)), mergeActionHooks('after', oldAction === null || oldAction === void 0 ? void 0 : oldAction.after, action === null || action === void 0 ? void 0 : action.after)), mergeActionHooks('handler', oldAction === null || oldAction === void 0 ? void 0 : oldAction.handler, action === null || action === void 0 ? void 0 : action.handler))
      });
    }, oldOptions.actions || {});
  }

  return options;
};
/**
 * @name buildFeature
 * @function
 * @description
 * Higher Order Function which creates a feature
 *
 * @param   {ResourceOptions}  options
 *
 * @return  {FeatureType}
 * @example
 * const { buildFeature } = require('adminjs')
 *
 * const feature = buildFeature({
 *   // resource options goes here.
 * })
 */


exports.mergeResourceOptions = mergeResourceOptions;

const buildFeature = (options = {}) => (prevOptions = {}) => mergeResourceOptions(prevOptions, options);

exports.buildFeature = buildFeature;