"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.DrawerPortal = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactDom = require("react-dom");

var _designSystem = require("@adminjs/design-system");

var _styledComponents = require("styled-components");

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const DRAWER_PORTAL_ID = 'drawerPortal';
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
  const [drawerElement, setDrawerElement] = (0, _react.useState)(window.document.getElementById(DRAWER_PORTAL_ID));

  if (!drawerElement && window) {
    const innerWrapper = window.document.createElement('div');

    const DrawerWrapper = /*#__PURE__*/_react.default.createElement(_styledComponents.ThemeProvider, {
      theme: window.THEME
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Drawer, {
      id: DRAWER_PORTAL_ID,
      className: "hidden"
    }));

    window.document.body.appendChild(innerWrapper);
    (0, _reactDom.render)(DrawerWrapper, innerWrapper, () => {
      setDrawerElement(window.document.getElementById(DRAWER_PORTAL_ID));
    });
  }

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