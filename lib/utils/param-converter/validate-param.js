"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.validateParam = exports.isUuid = exports.isSafeInteger = exports.isNumeric = void 0;
const isNumeric = value => !Number.isNaN(value);
exports.isNumeric = isNumeric;
const isUuid = value => {
  const rgx = /^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;
  return rgx.test(String(value));
};
exports.isUuid = isUuid;
const isSafeInteger = value => isNumeric(value) && Number.isSafeInteger(Number(value));
exports.isSafeInteger = isSafeInteger;
const isPositiveNumber = value => isNumeric(value) && Number(value) > 0;
const validateParam = (value, property) => {
  if (property.type() === 'number' || property.type() === 'float') {
    if (!property.isId()) return isNumeric(value);
    if (property.type() === 'float') return isPositiveNumber(value);
    return isSafeInteger(value) && isPositiveNumber(value);
  }
  if (property.type() === 'uuid') {
    return isUuid(value);
  }
  return true;
};
exports.validateParam = validateParam;