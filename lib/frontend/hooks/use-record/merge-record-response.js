"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Handlers of all [Actions]{@link Action} of type `record` returns record.
 * Depending on a place and response we have to merge what was returned
 * to the actual state. It is done in following places:
 * - {@link useRecord} hook
 * - {@link RecordInList} component
 * - {@link RecordAction} component
 *
 * @private
 */
const mergeRecordResponse = (record, response) => _objectSpread(_objectSpread({}, response.record || record), {}, {
  // records has to be reset every time because so that user wont
  // see old errors which are not relevant anymore
  errors: response.record.errors,
  populated: _objectSpread(_objectSpread({}, record.populated), response.record.populated),
  params: _objectSpread(_objectSpread({}, record.params), response.record.params)
});

var _default = mergeRecordResponse;
exports.default = _default;