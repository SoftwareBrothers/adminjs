"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));
var _errorMessage = require("../app/error-message");
var _app = require("../app");
var _wrapper = _interopRequireDefault(require("./utils/wrapper"));
var _drawerPortal = _interopRequireDefault(require("../app/drawer-portal"));
var _filterDrawer = _interopRequireDefault(require("../app/filter-drawer"));
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const ResourceAction = props => {
  const params = (0, _reactRouter.useParams)();
  const {
    resources
  } = props;
  const {
    resourceId,
    actionName
  } = params;
  const [filterVisible, setFilterVisible] = (0, _react.useState)(false);
  const [tag, setTag] = (0, _react.useState)('');
  const resource = resources.find(r => r.id === resourceId);
  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoResourceError, {
      resourceId: resourceId
    });
  }
  const action = resource.resourceActions.find(r => r.name === actionName);
  if (!action) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoActionError, {
      resourceId: resourceId,
      actionName: actionName
    });
  }
  const toggleFilter = action.showFilter ? () => setFilterVisible(!filterVisible) : undefined;
  if (action.showInDrawer) {
    return /*#__PURE__*/_react.default.createElement(_drawerPortal.default, {
      width: action.containerWidth
    }, /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
      action: action,
      resource: resource
    }));
  }
  return /*#__PURE__*/_react.default.createElement(_wrapper.default, {
    width: action.containerWidth,
    showFilter: action.showFilter
  }, /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: action,
    toggleFilter: toggleFilter,
    tag: tag
  }), /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
    action: action,
    resource: resource,
    setTag: setTag
  }), action.showFilter ? /*#__PURE__*/_react.default.createElement(_filterDrawer.default, {
    key: filterVisible.toString(),
    resource: resource,
    isVisible: filterVisible,
    toggleFilter: toggleFilter
  }) : '');
};
const mapStateToProps = state => ({
  resources: state.resources
});
var _default = (0, _reactRedux.connect)(mapStateToProps)(ResourceAction);
exports.default = _default;