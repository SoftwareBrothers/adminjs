"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.StyledBackButton = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@adminjs/design-system");

var _viewHelpers = _interopRequireDefault(require("../../../../backend/utils/view-helpers/view-helpers"));

const _excluded = ["rounded"];

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(source, excluded) { if (source == null) return {}; var target = _objectWithoutPropertiesLoose(source, excluded); var key, i; if (Object.getOwnPropertySymbols) { var sourceSymbolKeys = Object.getOwnPropertySymbols(source); for (i = 0; i < sourceSymbolKeys.length; i++) { key = sourceSymbolKeys[i]; if (excluded.indexOf(key) >= 0) continue; if (!Object.prototype.propertyIsEnumerable.call(source, key)) continue; target[key] = source[key]; } } return target; }

function _objectWithoutPropertiesLoose(source, excluded) { if (source == null) return {}; var target = {}; var sourceKeys = Object.keys(source); var key, i; for (i = 0; i < sourceKeys.length; i++) { key = sourceKeys[i]; if (excluded.indexOf(key) >= 0) continue; target[key] = source[key]; } return target; }

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = (0, _styledComponents.default)((_ref) => {
  let {
    rounded
  } = _ref,
      rest = _objectWithoutProperties(_ref, _excluded);

  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.Link, rest);
}).withConfig({
  displayName: "styled-back-button__StyledLink",
  componentId: "pn0p1u-0"
})(["", ""], _designSystem.ButtonCSS);
const h = new _viewHelpers.default();

const StyledBackButton = props => {
  const {
    resourceId,
    showInDrawer
  } = props;
  const location = (0, _reactRouterDom.useLocation)();
  const cssCloseIcon = showInDrawer ? 'ChevronRight' : 'ChevronLeft';
  const {
    previousPage
  } = location.state || {};
  const previousPageUrl = previousPage ? new URL(previousPage) : null;
  const backButtonUrl = previousPageUrl ? previousPageUrl.pathname + previousPageUrl.search : h.resourceUrl({
    resourceId,
    search: window.location.search
  });
  return /*#__PURE__*/_react.default.createElement(StyledLink, {
    size: "icon",
    to: backButtonUrl,
    rounded: true,
    mr: "lg",
    type: "button"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: cssCloseIcon
  }));
};

exports.StyledBackButton = StyledBackButton;