"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@adminjs/design-system");

const _excluded = ["children", "variant", "color"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

const StyledWrapper = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "wrapper__StyledWrapper",
  componentId: "sc-1jcopgf-0"
})(["& ", "{background:", ";padding:", ";overflow:visible;}& ", "{background:", ";padding:0 ", " ", ";}"], _designSystem.DrawerContent, ({
  theme
}) => theme.colors.white, ({
  theme
}) => theme.space.xxl, _designSystem.DrawerFooter, ({
  theme
}) => theme.colors.white, ({
  theme
}) => theme.space.xxl, ({
  theme
}) => theme.space.xxl);

const Wrapper = props => {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const {
    children,
    variant,
    color
  } = props,
        rest = _objectWithoutProperties(props, _excluded);

  return /*#__PURE__*/_react.default.createElement(StyledWrapper, _extends({}, rest, {
    variant: "grey",
    mx: "auto"
  }), children);
};

var _default = Wrapper;
exports.default = _default;