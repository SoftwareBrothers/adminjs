"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _designSystem = require("@adminjs/design-system");

var _default = (value, propertyType) => {
  if (!value) {
    return '';
  }

  const date = new Date(value);

  if (date) {
    return (0, _designSystem.formatDateProperty)(date, propertyType);
  }

  return '';
};

exports.default = _default;