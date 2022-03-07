"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _default = queryString => {
  const query = new URLSearchParams(queryString);

  for (const key of query.keys()) {
    if (key.match('filters.')) {
      return true;
    }
  }

  return false;
};

exports.default = _default;