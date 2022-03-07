"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const List = props => {
  const {
    property,
    record
  } = props;
  const original = record.params[property.path] || '';
  const value = original.substring(0, 15) + (original.length > 15 ? '...' : '');
  return /*#__PURE__*/_react.default.createElement("span", null, value);
};

var _default = List;
exports.default = _default;