"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _designSystem = require("@adminjs/design-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const theme = (0, _designSystem.combineStyles)({});

const TestContextProvider = props => {
  const {
    children,
    location
  } = props;
  return /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: theme
  }, /*#__PURE__*/_react.default.createElement(_reactRouterDom.StaticRouter, {
    location: location || '/'
  }, children));
};

var _default = TestContextProvider;
exports.default = _default;