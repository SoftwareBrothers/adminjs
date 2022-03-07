"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.updateRecord = exports.default = void 0;

var _flat = require("../../../utils/flat");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * HOF returning a function which takes a record and returns an updated record.
 * This way we can pass this to setState in react, which takes old state
 * (in our case previousRecord) as an argument.
 *
 * Function is used when to the {@link OnPropertyChange} callback, user passes
 * key (property name) and the value (followed by an optional selectedRecord).
 *
 * The responsibility of the function is to:
 * - clear old values under passed key: so when user passes property === `some.key`
 *   function removes `some.key.1`, `some.key.2` etc
 * - sets new value under the passed key for primitive types
 * - in case of objects - it flattens them first and then sets all the resulted values
 *   under the path provided in the property argument
 * - it fills value in RecordJSON#populated when selectedRecord is given
 * - finally it invalidates populated for given property
 *
 *
 * @param {string}      property        property that must be updated, supports nesting
 *                                      with dots
 * @param {any}         value           value that must be set, undefined or null if
 *                                      deleting, will be flattened
 * @param {RecordJSON}  selectedRecord  if value is reference ID, this must be a record
 *                                      it's referencing to
 * @private
 */
const updateRecord = (property, value, selectedRecord) => previousRecord => {
  let populatedModified = false;

  const populatedCopy = _objectSpread({}, previousRecord.populated);

  const paramsCopy = _flat.flat.set(previousRecord.params, property, value);

  if (property in populatedCopy) {
    delete populatedCopy[property];
    populatedModified = true;
  }

  if (selectedRecord) {
    populatedCopy[property] = selectedRecord;
    populatedModified = true;
  }

  return _objectSpread(_objectSpread({}, previousRecord), {}, {
    params: paramsCopy,
    populated: populatedModified ? populatedCopy : previousRecord.populated
  });
};

exports.updateRecord = updateRecord;
var _default = updateRecord;
exports.default = _default;