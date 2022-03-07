"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _designSystem = require("@adminjs/design-system");

var _reactRouter = require("react-router");

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _getBulkActionsFromRecords = _interopRequireDefault(require("../app/records-table/utils/get-bulk-actions-from-records"));

var _wrapper = _interopRequireDefault(require("./utils/wrapper"));

var _app = require("../app");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const api = new _apiClient.default();

const BulkAction = () => {
  const match = (0, _reactRouter.useRouteMatch)();
  const [records, setRecords] = (0, _react.useState)([]);
  const [loading, setLoading] = (0, _react.useState)(false);
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  const addNotice = (0, _hooks.useNotice)();
  const location = (0, _reactRouter.useLocation)();
  const {
    resourceId,
    actionName
  } = match.params;
  const resource = (0, _hooks.useResource)(resourceId);

  const fetchRecords = () => {
    const recordIdsString = new URLSearchParams(location.search).get('recordIds');
    const recordIds = recordIdsString ? recordIdsString.split(',') : [];
    setLoading(true);
    return api.bulkAction({
      resourceId,
      recordIds,
      actionName
    }).then(response => {
      setLoading(false);
      setRecords(response.data.records);
    }).catch(error => {
      setLoading(false);
      addNotice({
        message: translateMessage('errorFetchingRecords', resourceId),
        type: 'error'
      });
      throw error;
    });
  };

  (0, _react.useEffect)(() => {
    fetchRecords();
  }, [match.params.resourceId, match.params.actionName]);

  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_app.NoResourceError, {
      resourceId: resourceId
    });
  }

  if (!records && !loading) {
    return /*#__PURE__*/_react.default.createElement(_app.ErrorMessageBox, {
      title: "No records"
    }, /*#__PURE__*/_react.default.createElement("p", null, translateMessage('noRecordsSelected', resourceId)));
  }

  const action = (0, _getBulkActionsFromRecords.default)(records || []).find(r => r.name === actionName);

  if (loading) {
    const actionFromResource = resource.actions.find(r => r.name === actionName);
    return actionFromResource !== null && actionFromResource !== void 0 && actionFromResource.showInDrawer ? /*#__PURE__*/_react.default.createElement(_app.DrawerPortal, null, /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null)) : /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null);
  }

  if (!action) {
    return /*#__PURE__*/_react.default.createElement(_app.NoActionError, {
      resourceId: resourceId,
      actionName: actionName
    });
  }

  if (action.showInDrawer) {
    return /*#__PURE__*/_react.default.createElement(_app.DrawerPortal, {
      width: action.containerWidth
    }, /*#__PURE__*/_react.default.createElement(_app.BaseActionComponent, {
      action: action,
      resource: resource,
      records: records
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_wrapper.default, {
    width: action.containerWidth
  }, !(action !== null && action !== void 0 && action.showInDrawer) ? /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: action
  }) : '', /*#__PURE__*/_react.default.createElement(_app.BaseActionComponent, {
    action: action,
    resource: resource,
    records: records
  }));
};

var _default = BulkAction;
exports.default = _default;