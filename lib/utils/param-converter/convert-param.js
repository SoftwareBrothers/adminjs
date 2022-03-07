"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.convertParam = void 0;

const convertParam = (value, propertyType) => {
  if (propertyType === 'number') {
    return Number(value);
  }

  if (propertyType === 'boolean') {
    return Boolean(value);
  }

  if (['datetime', 'date'].includes(propertyType) && value !== null) {
    return new Date(value);
  }

  return value;
};

exports.convertParam = convertParam;