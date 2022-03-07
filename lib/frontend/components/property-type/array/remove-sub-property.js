"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.removeSubProperty = void 0;

var _utils = require("../../../../utils");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/**
 * Removes selected array item from given record. It performs following tasks:
 * 1. removes array item from the array
 * 2. reorders keys in new array item
 * 3. if property has populated fields it also reorders them
 * it uses {@link flat } module and its removePath method
 *
 * @param {RecordJSON} record
 * @param {string}     subPropertyPath            which has to be removed. It has to be flattened
 *                                                in notation, and ending with array index
 * @private
 * @hide
 */
const removeSubProperty = (record, subPropertyPath) => {
  // by default populated is flatten just to the path level - object itself is not flatten. That is
  // why we have to retrieve the original state. That is why we have to replace record.populated to
  // from { 'some.nested.1.key': RecordJSON } to { 'some.nested.1.key': 'some.nested.1.key' },
  // then remove keys, and refill back some.nested.1.key to the value from the original populated
  // object.
  const populatedKeyMap = Object.keys(record.populated).reduce((memo, propertyKey) => _objectSpread(_objectSpread({}, memo), {}, {
    [propertyKey]: propertyKey
  }), {});

  const newPopulatedKeyMap = _utils.flat.removePath(populatedKeyMap, subPropertyPath);

  const newPopulated = Object.entries(newPopulatedKeyMap).reduce((memo, [newPropertyKey, oldPropertyKey]) => _objectSpread(_objectSpread({}, memo), {}, {
    [newPropertyKey]: oldPropertyKey && record.populated[oldPropertyKey === null || oldPropertyKey === void 0 ? void 0 : oldPropertyKey.toString()]
  }), {});
  return _objectSpread(_objectSpread({}, record), {}, {
    params: _utils.flat.removePath(record.params, subPropertyPath),
    populated: newPopulated
  });
};

exports.removeSubProperty = removeSubProperty;