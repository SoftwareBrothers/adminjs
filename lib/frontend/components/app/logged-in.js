"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.LoggedIn = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../hooks");

var _allowOverride = _interopRequireDefault(require("../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const LoggedIn = props => {
  const {
    session,
    paths
  } = props;
  const {
    translateButton
  } = (0, _hooks.useTranslation)();
  const dropActions = [{
    label: translateButton('logout'),
    onClick: event => {
      event.preventDefault();
      window.location.href = paths.logoutPath;
    },
    icon: 'Logout'
  }];
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexShrink: 0
  }, /*#__PURE__*/_react.default.createElement(_designSystem.CurrentUserNav, {
    name: session.email,
    title: session.title,
    avatarUrl: session.avatarUrl,
    dropActions: dropActions
  }));
};

const OverridableLoggedIn = (0, _allowOverride.default)(LoggedIn, 'LoggedIn');
exports.LoggedIn = exports.default = OverridableLoggedIn;