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
  const {
    property,
    record,
    onChange
  } = props;
  const propValue = record.params[property.path];
  const [value, setValue] = (0, _react.useState)(propValue);
  const error = record.errors && record.errors[property.path];
  const [isInput, setIsInput] = (0, _react.useState)(false);
  (0, _react.useEffect)(() => {
    if (value !== propValue) {
      setValue(propValue);
    }
  }, [propValue]);
  return /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, {
    error: !!error
  }, /*#__PURE__*/_react.default.createElement(_propertyLabel.PropertyLabel, {
    property: property
  }), /*#__PURE__*/_react.default.createElement(_designSystem.InputGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Input, _extends({
    type: isInput ? 'input' : 'password',
    className: "input",
    id: property.path,
    name: property.path,
    onChange: event => setValue(event.target.value),
    onBlur: () => onChange(property.path, value),
    onKeyDown: e => e.keyCode === 13 && onChange(property.path, value),
    value: value !== null && value !== void 0 ? value : '',
    disabled: property.isDisabled
  }, property.props)), /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: isInput ? 'primary' : 'text',
    type: "button",
    size: "icon",
    onClick: () => setIsInput(!isInput)
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "View"
  }))), /*#__PURE__*/_react.default.createElement(_designSystem.FormMessage, null, error && error.message));
};

var _default = /*#__PURE__*/(0, _react.memo)(Edit, _recordPropertyIsEqual.recordPropertyIsEqual);

exports.default = _default;