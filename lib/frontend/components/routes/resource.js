"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _react = _interopRequireWildcard(require("react"));
var _reactRedux = require("react-redux");
var _reactRouter = require("react-router");
var _designSystem = require("@adminjs/design-system");
var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));
var _filterDrawer = _interopRequireDefault(require("../app/filter-drawer"));
var _errorMessage = require("../app/error-message");
var _viewHelpers = _interopRequireDefault(require("../../../backend/utils/view-helpers/view-helpers"));
var _app = require("../app");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function (nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
const getAction = resource => {
  const h = new _viewHelpers.default();
  const resourceId = ':resourceId';
  const actionName = ':actionName';
  const recordId = ':recordId';
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
  const resourceActionMatch = (0, _reactRouter.useMatch)(resourceActionUrl);
  const recordActionMatch = (0, _reactRouter.useMatch)(recordActionUrl);
  const bulkActionMatch = (0, _reactRouter.useMatch)(bulkActionUrl);
  const action = (resourceActionMatch === null || resourceActionMatch === void 0 ? void 0 : resourceActionMatch.params.actionName) || (recordActionMatch === null || recordActionMatch === void 0 ? void 0 : recordActionMatch.params.actionName) || (bulkActionMatch === null || bulkActionMatch === void 0 ? void 0 : bulkActionMatch.params.actionName);
  return action ? resource.actions.find(a => a.name === action) : undefined;
};
const ResourceAction = props => {
  const params = (0, _reactRouter.useParams)();
  const {
    resources
  } = props;
  const {
    resourceId
  } = params;
  const [filterVisible, setFilterVisible] = (0, _react.useState)(false);
  const [tag, setTag] = (0, _react.useState)('');
  if (!resourceId) {
    return null;
  }
  const resource = resources.find(r => r.id === resourceId);
  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoResourceError, {
      resourceId: resourceId
    });
  }
  const realEndAction = getAction(resource);
  if (realEndAction && !realEndAction.showInDrawer) {
    return null;
  }
  const listActionName = 'list';
  const listAction = resource.resourceActions.find(r => r.name === listActionName);
  if (!listAction) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoActionError, {
      resourceId: resourceId,
      actionName: listActionName
    });
  }
  const toggleFilter = listAction.showFilter ? () => setFilterVisible(!filterVisible) : undefined;
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    variant: "grey",
    width: listAction.containerWidth,
    mx: "auto"
  }, /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: listAction,
    tag: tag,
    toggleFilter: toggleFilter
  }), /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
    action: listAction,
    resource: resource,
    setTag: setTag
  }), listAction.showFilter ? /*#__PURE__*/_react.default.createElement(_filterDrawer.default, {
    key: filterVisible.toString(),
    resource: resource,
    isVisible: filterVisible,
    toggleFilter: () => {
      setFilterVisible(!filterVisible);
    }
  }) : '');
};
const mapStateToProps = state => ({
  resources: state.resources
});
var _default = (0, _reactRedux.connect)(mapStateToProps)(ResourceAction);
exports.default = _default;