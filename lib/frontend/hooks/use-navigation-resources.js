"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
exports.useNavigationResources = useNavigationResources;

var _reactRouter = require("react-router");

var _react = require("react");

var _useLocalStorage = _interopRequireDefault(require("./use-local-storage/use-local-storage"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

const isSelected = (href, location) => {
  const regExp = new RegExp(`${href}($|/)`);
  return !!location.pathname.match(regExp);
};

function useNavigationResources(resources) {
  const [openElements, setOpenElements] = (0, _useLocalStorage.default)('sidebarElements', {});
  const history = (0, _reactRouter.useHistory)();
  const location = (0, _reactRouter.useLocation)();
  const enrichResource = (0, _react.useMemo)(() => (resource, icon) => ({
    href: resource.href || undefined,
    icon,
    isSelected: isSelected(resource.href, location),
    label: resource.name,
    id: resource.id,
    onClick: event => {
      if (resource.href) {
        event.preventDefault();
        history.push(resource.href, {
          previousPage: window.location.href
        });
      }
    }
  }), [location, history]); // grouping resources into parents

  const map = resources // first filter out resources which are not visible
  .filter(res => {
    var _res$navigation;

    return res.href && ((_res$navigation = res.navigation) === null || _res$navigation === void 0 ? void 0 : _res$navigation.show) !== false;
  }).reduce((memo, resource) => {
    var _resource$navigation, _resource$navigation3;

    // in case resource has the same name as parent we namespace it wit "resource-""
    const key = ((_resource$navigation = resource.navigation) === null || _resource$navigation === void 0 ? void 0 : _resource$navigation.name) || ['resource', resource.name].join('-');

    if (!resource.navigation || resource.navigation.name === null) {
      var _resource$navigation2;

      memo[key] = enrichResource(resource, (_resource$navigation2 = resource.navigation) === null || _resource$navigation2 === void 0 ? void 0 : _resource$navigation2.icon);
    } else if (memo[key] && memo[key].elements && (_resource$navigation3 = resource.navigation) !== null && _resource$navigation3 !== void 0 && _resource$navigation3.name) {
      memo[key].elements.push(enrichResource(resource));
    } else {
      var _resource$navigation4, _resource$navigation5;

      memo[key] = {
        elements: [enrichResource(resource)],
        label: (_resource$navigation4 = resource.navigation) === null || _resource$navigation4 === void 0 ? void 0 : _resource$navigation4.name,
        icon: (_resource$navigation5 = resource.navigation) === null || _resource$navigation5 === void 0 ? void 0 : _resource$navigation5.icon,
        onClick: () => setOpenElements(_objectSpread(_objectSpread({}, openElements), {}, {
          [key]: !openElements[key]
        })),
        isOpen: !!openElements[key]
      };
    }

    return memo;
  }, {});
  return Object.values(map);
}

var _default = useNavigationResources;
exports.default = _default;