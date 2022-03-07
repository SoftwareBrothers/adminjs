"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _designSystem = require("@adminjs/design-system");

var _recordPropertyIsEqual = require("../record-property-is-equal");

var _propertyLabel = require("../utils/property-label");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Edit = props => {
  var _record$params$proper, _record$params, _record$errors;

  const {
    onChange,
    property,
    record
  } = props;
  const propValue = (_record$params$proper = (_record$params = record.params) === null || _record$params === void 0 ? void 0 : _record$params[property.path]) !== null && _record$params$proper !== void 0 ? _record$params$proper : '';
  const [value, setValue] = (0, _react.useState)(propValue);
  const error = (_record$errors = record.errors) === null || _record$errors === void 0 ? void 0 : _record$errors[property.path];
  (0, _react.useEffect)(() => {
    if (value !== propValue) {
      setValue(propValue);
    }
  }, [propValue]);
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: Boolean(error)
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Input, _extends({
    as: "textarea",
    rows: (value.match(/\n/g) || []).length + 1,
    id: property.path,
    name: property.path,
    onChange: e => setValue(e.target.value),
    onBlur: () => onChange(property.path, value),
    value: value,
    disabled: property.isDisabled
  }, property.props)), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};

var _default = /*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual);

exports.default = _default;