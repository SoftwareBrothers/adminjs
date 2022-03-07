"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Login = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireWildcard(require("styled-components"));

var _reactRedux = require("react-redux");

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../hooks");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const GlobalStyle = (0, _styledComponents.createGlobalStyle)`
  html, body, #app {
    width: 100%;
    height: 100%;
    margin: 0;
    padding: 0;
  }
`;
const Wrapper = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "login__Wrapper",
  componentId: "sc-13rvd86-0"
})(["align-items:center;justify-content:center;flex-direction:column;height:100%;"]);

const StyledLogo = _styledComponents.default.img.withConfig({
  displayName: "login__StyledLogo",
  componentId: "sc-13rvd86-1"
})(["max-width:200px;margin:", " 0;"], (0, _designSystem.themeGet)('space', 'md'));

const Login = props => {
  const {
    action,
    message
  } = props;
  const {
    translateLabel,
    translateButton,
    translateProperty,
    translateMessage
  } = (0, _hooks.useTranslation)();
  const branding = (0, _reactRedux.useSelector)(state => state.branding);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(GlobalStyle, null), /*#__PURE__*/_react.default.createElement(Wrapper, {
    flex: true,
    variant: "grey"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    bg: "white",
    height: "440px",
    flex: true,
    boxShadow: "login",
    width: [1, 2 / 3, 'auto']
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    bg: "primary100",
    color: "white",
    p: "x3",
    width: "380px",
    flexGrow: 0,
    display: ['none', 'none', 'block'],
    position: "relative"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.H2, {
    fontWeight: "lighter"
  }, translateLabel('loginWelcome')), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    fontWeight: "lighter",
    mt: "default"
  }, translateMessage('loginWelcome')), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    textAlign: "center",
    p: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    display: "inline",
    mr: "default"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "Planet",
    width: 82,
    height: 91
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    display: "inline"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "Astronaut",
    width: 82,
    height: 91
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    display: "inline",
    position: "relative",
    top: "-20px"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Illustration, {
    variant: "FlagInCog",
    width: 82,
    height: 91
  })))), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    as: "form",
    action: action,
    method: "POST",
    p: "x3",
    flexGrow: 1,
    width: ['100%', '100%', '480px']
  }, /*#__PURE__*/_react.default.createElement(_designSystem.H5, {
    marginBottom: "xxl"
  }, branding.logo ? /*#__PURE__*/_react.default.createElement(StyledLogo, {
    src: branding.logo,
    alt: branding.companyName
  }) : branding.companyName), message && /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    my: "lg",
    message: message.split(' ').length > 1 ? message : translateMessage(message),
    variant: "danger"
  }), /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
    required: true
  }, translateProperty('email')), /*#__PURE__*/_react.default.createElement(_designSystem.Input, {
    name: "email",
    placeholder: translateProperty('email')
  })), /*#__PURE__*/_react.default.createElement(_designSystem.FormGroup, null, /*#__PURE__*/_react.default.createElement(_designSystem.Label, {
    required: true
  }, translateProperty('password')), /*#__PURE__*/_react.default.createElement(_designSystem.Input, {
    type: "password",
    name: "password",
    placeholder: translateProperty('password'),
    autoComplete: "new-password"
  })), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    mt: "xl",
    textAlign: "center"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary"
  }, translateButton('login'))))), branding.softwareBrothers ? /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    mt: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.SoftwareBrothers, null)) : null));
};

exports.Login = Login;
var _default = Login;
exports.default = _default;