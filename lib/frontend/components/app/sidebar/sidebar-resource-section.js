"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SidebarResourceSection = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _useTranslation = require("../../../hooks/use-translation");

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Groups resources by sections and renders the list in {@link Sidebar}
 *
 * ### Usage
 *
 * ```
 * import { SidebarResourceSection } from 'adminjs`
 * ```
 *
 * @component
 * @subcategory Application
 * @name SidebarResourceSection
 */
const SidebarResourceSectionOriginal = ({
  resources
}) => {
  const elements = (0, _hooks.useNavigationResources)(resources);
  const {
    translateLabel
  } = (0, _useTranslation.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Navigation, {
    label: translateLabel('navigation'),
    elements: elements
  });
}; // Rollup cannot handle type exports well - that is why we need to do this hack with
// exporting default and named SidebarResourceSection


const SidebarResourceSection = (0, _allowOverride.default)(SidebarResourceSectionOriginal, 'SidebarResourceSection');
exports.SidebarResourceSection = SidebarResourceSection;
var _default = SidebarResourceSection;
exports.default = _default;