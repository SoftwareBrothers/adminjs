"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DrawerPortal = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactDom = require("react-dom");
var _client = require("react-dom/client");
var _designSystem = require("@adminjs/design-system");
var _styledComponents = require("styled-components");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const DRAWER_PORTAL_ID = 'drawerPortal';
const DRAWER_PORTAL_WRAPPER_ID = 'drawerPortalWrapper';
const DrawerWrapper = ({
  onMount
}) => {
  (0, _react.useEffect)(() => {
    onMount();
  }, []);
  return /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
    theme: window.THEME
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Drawer, {
    id: DRAWER_PORTAL_ID,
    className: "hidden"
  }));
};
const getOrCreatePortalContainer = id => {
  let container = document.getElementById(id);
  if (!container) {
    container = window.document.createElement('div');
    container.id = id;
    window.document.body.appendChild(container);
  }
  return container;
};

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * ### Usage
 *
 * ```
 * import { DrawerPortal } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
const DrawerPortal = ({
  children,
  width
}) => {
  const [drawerElement, setDrawerElement] = (0, _react.useState)(document.getElementById(DRAWER_PORTAL_ID));
  const handleDrawerMount = () => {
    setDrawerElement(document.getElementById(DRAWER_PORTAL_ID));
  };
  (0, _react.useEffect)(() => {
    const innerWrapperElement = getOrCreatePortalContainer(DRAWER_PORTAL_WRAPPER_ID);
    if (!drawerElement && window) {
      const drawerRoot = (0, _client.createRoot)(innerWrapperElement);
      drawerRoot.render( /*#__PURE__*/_react.default.createElement(DrawerWrapper, {
        onMount: handleDrawerMount
      }));
    }
    return () => {
      const innerWrapper = document.getElementById(DRAWER_PORTAL_WRAPPER_ID);
      if (innerWrapper) document.body.removeChild(innerWrapper);
    };
  }, []);
  (0, _react.useEffect)(() => {
    if (drawerElement) {
      drawerElement.classList.remove('hidden');
      if (width) {
        drawerElement.style.width = Array.isArray(width) ? width[0].toString() : width.toString();
      }
      return () => {
        drawerElement.style.width = _designSystem.DEFAULT_DRAWER_WIDTH;
        drawerElement.classList.add('hidden');
      };
    }
    return () => undefined;
  }, [drawerElement]);
  if (!drawerElement) {
    return null;
  }
  return /*#__PURE__*/(0, _reactDom.createPortal)(children, drawerElement);
};
exports.DrawerPortal = DrawerPortal;
var _default = DrawerPortal;
exports.default = _default;