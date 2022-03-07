"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Sidebar = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRedux = require("react-redux");

var _designSystem = require("@adminjs/design-system");

var _sidebarBranding = _interopRequireDefault(require("./sidebar-branding"));

var _sidebarPages = _interopRequireDefault(require("./sidebar-pages"));

var _sidebarFooter = _interopRequireDefault(require("./sidebar-footer"));

var _sidebarResourceSection = _interopRequireDefault(require("./sidebar-resource-section"));

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledSidebar = (0, _styledComponents.default)(_designSystem.Box).withConfig({
  displayName: "sidebar__StyledSidebar",
  componentId: "rspq5q-0"
})(["transition:left 0.3s;top:0;bottom:0;flex-shrink:0;overflow-y:auto;&.hidden{left:-", ";}&.visible{left:0;}"], (0, _designSystem.themeGet)('sizes', 'sidebarWidth'));
StyledSidebar.defaultProps = {
  position: ['absolute', 'absolute', 'absolute', 'absolute', 'inherit'],
  width: 'sidebarWidth',
  borderRight: 'default',
  display: 'flex',
  flexDirection: 'column',
  zIndex: 50,
  bg: 'white'
};

const SidebarOriginal = props => {
  const {
    isVisible
  } = props;
  const [branding, resources, pages] = (0, _reactRedux.useSelector)(state => [state.branding, state.resources, state.pages]);
  return /*#__PURE__*/_react.default.createElement(StyledSidebar, {
    className: isVisible ? 'visible' : 'hidden'
  }, /*#__PURE__*/_react.default.createElement(_sidebarBranding.default, {
    branding: branding
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexGrow: 1,
    className: (0, _designSystem.cssClass)('Resources')
  }, /*#__PURE__*/_react.default.createElement(_sidebarResourceSection.default, {
    resources: resources
  })), /*#__PURE__*/_react.default.createElement(_sidebarPages.default, {
    pages: pages
  }), (branding === null || branding === void 0 ? void 0 : branding.softwareBrothers) && /*#__PURE__*/_react.default.createElement(_sidebarFooter.default, null));
};

const Sidebar = (0, _allowOverride.default)(SidebarOriginal, 'Sidebar');
exports.Sidebar = Sidebar;
var _default = Sidebar;
exports.default = _default;