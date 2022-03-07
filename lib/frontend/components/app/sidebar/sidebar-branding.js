"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.StyledLogo = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@adminjs/design-system");

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers/view-helpers"));

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const StyledLogo = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "sidebar-branding__StyledLogo",
  componentId: "sc-13gs4e8-0"
})(["text-align:center;display:flex;align-content:center;justify-content:center;flex-shrink:0;padding:", " ", " ", ";text-decoration:none;& > h1{text-decoration:none;font-weight:", ";font-size:", ";color:", ";font-size:", ";line-height:", ";}& > img{max-width:170px;}&:hover h1{color:", ";}"], (0, _designSystem.themeGet)('space', 'lg'), (0, _designSystem.themeGet)('space', 'xxl'), (0, _designSystem.themeGet)('space', 'xxl'), (0, _designSystem.themeGet)('fontWeights', 'bolder'), (0, _designSystem.themeGet)('fontWeights', 'bolder'), (0, _designSystem.themeGet)('colors', 'grey80'), (0, _designSystem.themeGet)('fontSizes', 'xl'), (0, _designSystem.themeGet)('lineHeights', 'xl'), (0, _designSystem.themeGet)('colors', 'primary100'));
exports.StyledLogo = StyledLogo;
const h = new _viewHelpers.default();

const SidebarBranding = props => {
  const {
    branding
  } = props;
  const {
    logo,
    companyName
  } = branding;
  return /*#__PURE__*/_react.default.createElement(StyledLogo, {
    className: (0, _designSystem.cssClass)('Logo'),
    to: h.dashboardUrl()
  }, logo ? /*#__PURE__*/_react.default.createElement("img", {
    src: logo,
    alt: companyName
  }) : /*#__PURE__*/_react.default.createElement("h1", null, companyName));
};

var _default = (0, _allowOverride.default)(SidebarBranding, 'SidebarBranding');

exports.default = _default;