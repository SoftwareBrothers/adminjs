"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Breadcrumbs = exports.BreadcrumbLink = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@adminjs/design-system");

var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers/view-helpers"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const BreadcrumbLink = (0, _styledComponents.default)(_reactRouterDom.Link).withConfig({
  displayName: "breadcrumbs__BreadcrumbLink",
  componentId: "tbb6y0-0"
})(["color:", ";font-family:", ";line-height:", ";font-size:", ";text-decoration:none;&:hover{color:", ";}&:after{content:'/';padding:0 ", ";}&:last-child{&:after{content:'';}}"], ({
  theme
}) => theme.colors.grey40, ({
  theme
}) => theme.font, ({
  theme
}) => theme.lineHeights.default, ({
  theme
}) => theme.fontSizes.default, ({
  theme
}) => theme.colors.primary100, ({
  theme
}) => theme.space.default);
/**
 * @memberof Breadcrumbs
 */

exports.BreadcrumbLink = BreadcrumbLink;

/**
 * @component
 * @private
 */
const Breadcrumbs = props => {
  const {
    resource,
    record,
    actionName
  } = props;
  const action = resource.actions.find(a => a.name === actionName);
  const h = new _viewHelpers.default();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexGrow: 1,
    className: (0, _designSystem.cssClass)('Breadcrumbs')
  }, /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: h.dashboardUrl()
  }, "Dashboard"), /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: resource.href ? resource.href : '/',
    className: record ? 'is-active' : ''
  }, resource.name), action && action.name !== 'list' && /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: "#"
  }, action.label));
};

exports.Breadcrumbs = Breadcrumbs;
var _default = Breadcrumbs;
exports.default = _default;