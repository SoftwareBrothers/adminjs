"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _styledComponents = require("styled-components");

var _designSystem = require("@adminjs/design-system");

var _reactRouter = require("react-router");

var _viewHelpers = _interopRequireDefault(require("../../backend/utils/view-helpers/view-helpers"));

var _sidebar = _interopRequireDefault(require("./app/sidebar/sidebar"));

var _topBar = _interopRequireDefault(require("./app/top-bar"));

var _notice = _interopRequireDefault(require("./app/notice"));

var _routes = require("./routes");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

/* eslint-disable react/no-children-prop */
const GlobalStyle = (0, _styledComponents.createGlobalStyle)`
  html, body, #app {
    margin: 0;
    padding: 0;
    width: 100%;
    height: 100%;
    color: ${({
  theme
}) => theme.colors.grey100}
  }
`;
const h = new _viewHelpers.default();

const App = () => {
  const [sidebarVisible, toggleSidebar] = (0, _react.useState)(false);
  const location = (0, _reactRouter.useLocation)();
  (0, _react.useEffect)(() => {
    if (sidebarVisible) {
      toggleSidebar(false);
    }
  }, [location]);
  const resourceId = ':resourceId';
  const actionName = ':actionName';
  const recordId = ':recordId';
  const pageName = ':pageName';
  const recordActionUrl = h.recordActionUrl({
    resourceId,
    recordId,
    actionName
  });
  const resourceActionUrl = h.resourceActionUrl({
    resourceId,
    actionName
  });
  const bulkActionUrl = h.bulkActionUrl({
    resourceId,
    actionName
  });
  const resourceUrl = h.resourceUrl({
    resourceId
  });
  const pageUrl = h.pageUrl(pageName);
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_designSystem.Reset, null), /*#__PURE__*/_react.default.createElement(GlobalStyle, null), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    height: "100%",
    flex: true
  }, sidebarVisible ? /*#__PURE__*/_react.default.createElement(_designSystem.Overlay, {
    onClick: () => toggleSidebar(!sidebarVisible)
  }) : null, /*#__PURE__*/_react.default.createElement(_sidebar.default, {
    isVisible: sidebarVisible
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    flexGrow: 1,
    flexDirection: "column",
    overflowY: "auto",
    bg: "bg"
  }, /*#__PURE__*/_react.default.createElement(_topBar.default, {
    toggleSidebar: () => toggleSidebar(!sidebarVisible)
  }), /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    position: "absolute",
    top: 0,
    zIndex: 2000
  }, /*#__PURE__*/_react.default.createElement(_notice.default, null)), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: h.dashboardUrl(),
    exact: true,
    component: _routes.Dashboard
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: resourceUrl,
    component: _routes.Resource
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: pageUrl,
    exact: true,
    component: _routes.Page
  })), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Switch, null, /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: recordActionUrl,
    component: _routes.RecordAction
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: resourceActionUrl,
    component: _routes.ResourceAction
  }), /*#__PURE__*/_react.default.createElement(_reactRouterDom.Route, {
    path: bulkActionUrl,
    component: _routes.BulkAction
  })))));
};

var _default = App;
exports.default = _default;