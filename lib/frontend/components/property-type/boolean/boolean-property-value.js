"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../../hooks");

var _mapValue = _interopRequireDefault(require("./map-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BooleanPropertyValue = props => {
  const {
    record,
    property,
    resource
  } = props;
  const {
    translateProperty
  } = (0, _hooks.useTranslation)();
  const rawValue = record === null || record === void 0 ? void 0 : record.params[property.path];

  if (typeof rawValue === 'undefined' || rawValue === '') {
    return null;
  }

  const base = (0, _mapValue.default)(rawValue);
  const translation = translateProperty(`${property.path}.${rawValue}`, resource.id, {
    defaultValue: base
  });
  return /*#__PURE__*/_react.default.createElement(_designSystem.Badge, {
    outline: true,
    size: "sm"
  }, translation);
};

var _default = BooleanPropertyValue;
exports.default = _default;