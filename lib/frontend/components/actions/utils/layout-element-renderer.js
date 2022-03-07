"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LayoutElementRenderer = void 0;

var _react = _interopRequireDefault(require("react"));

var DesignSystem = _interopRequireWildcard(require("@adminjs/design-system"));

var _propertyType = _interopRequireDefault(require("../../property-type"));

const _excluded = ["children"];

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const LayoutElementRenderer = props => {
  const {
    layoutElement,
    resource,
    where,
    record,
    onChange
  } = props;
  const {
    props: layoutProps,
    properties: propertyNames,
    layoutElements: innerLayoutElements,
    component
  } = layoutElement;

  const {
    children
  } = layoutProps,
        other = _objectWithoutProperties(layoutProps, _excluded);

  const properties = propertyNames.map(name => resource.properties[name]);
  const Component = DesignSystem[component];

  if (!Component) {
    return /*#__PURE__*/_react.default.createElement(DesignSystem.MessageBox, {
      size: "sm",
      message: "Javascript Error",
      variant: "danger",
      py: "xl"
    }, "There is no component by the name of", /*#__PURE__*/_react.default.createElement(DesignSystem.Badge, {
      size: "sm",
      variant: "danger",
      mx: "default"
    }, component), "in @adminjs/design-system. Change", /*#__PURE__*/_react.default.createElement(DesignSystem.Badge, {
      size: "sm",
      variant: "danger",
      mx: "default"
    }, `@${component}`), "to available component like @Header");
  }

  return /*#__PURE__*/_react.default.createElement(Component, other, properties.map(property => /*#__PURE__*/_react.default.createElement(DesignSystem.Box, {
    flexGrow: 1,
    key: property.propertyPath
  }, /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: where,
    property: property,
    resource: resource,
    record: record,
    onChange: onChange
  }))), innerLayoutElements.map((innerLayoutElement, i) => /*#__PURE__*/_react.default.createElement(LayoutElementRenderer, _extends({}, props, {
    // eslint-disable-next-line react/no-array-index-key
    key: i,
    layoutElement: innerLayoutElement
  }))), children);
};

exports.LayoutElementRenderer = LayoutElementRenderer;
var _default = LayoutElementRenderer;
exports.default = _default;