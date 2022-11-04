"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRouterDom = require("react-router-dom");
var _designSystem = require("@adminjs/design-system");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const SortLink = props => {
  const {
    sortBy,
    property,
    direction
  } = props;
  const location = (0, _reactRouterDom.useLocation)();
  const isActive = (0, _react.useMemo)(() => sortBy === property.propertyPath, [sortBy, property]);
  const query = new URLSearchParams(location.search);
  const oppositeDirection = isActive && direction === 'asc' ? 'desc' : 'asc';
  const sortedByIcon = `Caret${direction === 'asc' ? 'Up' : 'Down'}`;
  query.set('direction', oppositeDirection);
  query.set('sortBy', property.propertyPath);
  return /*#__PURE__*/_react.default.createElement(_reactRouterDom.NavLink, {
    to: {
      search: query.toString()
    },
    className: (0, _designSystem.cssClass)('SortLink')
  }, property.label, isActive ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: sortedByIcon,
    color: "primary100",
    ml: "default"
  }) : '');
};
const checkSortProps = (prevProps, nextProps) => prevProps.direction === nextProps.direction && prevProps.property.propertyPath === nextProps.property.propertyPath && prevProps.sortBy === nextProps.sortBy;
var _default = /*#__PURE__*/(0, _react.memo)(SortLink, checkSortProps);
exports.default = _default;