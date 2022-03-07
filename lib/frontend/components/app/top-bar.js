"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.TopBar = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@adminjs/design-system");

var _loggedIn = _interopRequireDefault(require("./logged-in"));

var _version = _interopRequireDefault(require("./version"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NavBar = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "top-bar__NavBar",
  componentId: "vpnnkx-0"
})(["height:", ";border-bottom:", ";background:", ";display:flex;flex-direction:row;flex-shrink:0;"], ({
  theme
}) => theme.sizes.navbarHeight, (0, _designSystem.themeGet)('borders', 'default'), ({
  theme
}) => theme.colors.white);
NavBar.defaultProps = {
  className: (0, _designSystem.cssClass)('NavBar')
};

const TopBar = props => {
  const {
    toggleSidebar
  } = props;
  const [session, paths, versions] = (0, _reactRedux.useSelector)(state => [state.session, state.paths, state.versions]);
  return /*#__PURE__*/_react.default.createElement(NavBar, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    py: "lg",
    px: ['default', 'lg'],
    onClick: toggleSidebar,
    display: ['block', 'block', 'block', 'block', 'none'],
    style: {
      cursor: 'pointer'
    }
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Menu",
    size: 32,
    color: "grey100"
  })), /*#__PURE__*/_react.default.createElement(_version.default, {
    versions: versions
  }), session && session.email ? /*#__PURE__*/_react.default.createElement(_loggedIn.default, {
    session: session,
    paths: paths
  }) : '');
};

exports.TopBar = TopBar;
var _default = TopBar;
exports.default = _default;