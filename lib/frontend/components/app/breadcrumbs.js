"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Breadcrumbs = exports.BreadcrumbText = exports.BreadcrumbLink = void 0;
var _react = _interopRequireDefault(require("react"));
var _reactRouterDom = require("react-router-dom");
var _styledComponents = _interopRequireDefault(require("styled-components"));
var _designSystem = require("@adminjs/design-system");
var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers/view-helpers"));
var _useTranslation = require("../../hooks/use-translation");
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
exports.BreadcrumbLink = BreadcrumbLink;
const BreadcrumbText = (0, _styledComponents.default)(_designSystem.Text).withConfig({
  displayName: "breadcrumbs__BreadcrumbText",
  componentId: "tbb6y0-1"
})(["color:", ";font-family:", ";font-weight:", ";line-height:", ";font-size:", ";cursor:pointer;display:inline;&:after{content:'/';padding:0 ", ";}&:last-child{&:after{content:'';}}"], ({
  theme
}) => theme.colors.grey40, ({
  theme
}) => theme.font, ({
  theme
}) => theme.fontWeights.normal.toString(), ({
  theme
}) => theme.lineHeights.default, ({
  theme
}) => theme.fontSizes.default, ({
  theme
}) => theme.space.default);

/**
 * @memberof Breadcrumbs
 */
exports.BreadcrumbText = BreadcrumbText;
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
  const listAction = resource.resourceActions.find(({
    name
  }) => name === 'list');
  const action = resource.actions.find(a => a.name === actionName);
  const h = new _viewHelpers.default();
  const {
    translateLabel: tl
  } = (0, _useTranslation.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flexGrow: 1,
    className: (0, _designSystem.cssClass)('Breadcrumbs')
  }, /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: h.dashboardUrl()
  }, tl('dashboard')), listAction ? /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: resource.href ? resource.href : '/',
    className: record ? 'is-active' : ''
  }, resource.name) : /*#__PURE__*/_react.default.createElement(BreadcrumbText, null, resource.name), action && action.name !== 'list' && /*#__PURE__*/_react.default.createElement(BreadcrumbLink, {
    to: "#"
  }, action.label));
};
exports.Breadcrumbs = Breadcrumbs;
var _default = Breadcrumbs;
exports.default = _default;