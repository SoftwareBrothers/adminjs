"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _designSystem = require("@adminjs/design-system");

var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));

var _apiClient = _interopRequireDefault(require("../../utils/api-client"));

var _errorMessage = require("../app/error-message");

var _wrapper = _interopRequireDefault(require("./utils/wrapper"));

var _app = require("../app");

var _hooks = require("../../hooks");

var _drawerPortal = _interopRequireDefault(require("../app/drawer-portal"));

var _mergeRecordResponse = _interopRequireDefault(require("../../hooks/use-record/merge-record-response"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const api = new _apiClient.default();

const RecordAction = () => {
  const [record, setRecord] = (0, _react.useState)();
  const [loading, setLoading] = (0, _react.useState)(true);
  const match = (0, _reactRouter.useRouteMatch)();
  const addNotice = (0, _hooks.useNotice)();
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  const {
    actionName,
    recordId,
    resourceId
  } = match.params;
  const resource = (0, _hooks.useResource)(resourceId);
  const action = record && record.recordActions.find(r => r.name === actionName);

  const fetchRecord = () => {
    setLoading(true);
    api.recordAction(match.params).then(response => {
      setLoading(false);

      if (response.data.notice && response.data.notice.type === 'error') {
        addNotice(response.data.notice);
      }

      setRecord(response.data.record);
    }).catch(error => {
      addNotice({
        message: translateMessage('errorFetchingRecord', resourceId),
        type: 'error'
      });
      throw error;
    });
  };

  (0, _react.useEffect)(() => {
    fetchRecord();
  }, [actionName, recordId, resourceId]);
  const handleActionPerformed = (0, _react.useCallback)((oldRecord, response) => {
    if (response.record) {
      setRecord((0, _mergeRecordResponse.default)(oldRecord, response));
    } else {
      fetchRecord();
    }
  }, [fetchRecord]);

  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoResourceError, {
      resourceId: resourceId
    });
  } // When the user visits this route (record action) from a different, than the current one, record.
  // It renders everything with a new resource. The old record remains until useEffect fetches data
  // from the API. that is why we have to check if the current record has correct record.id.
  // Alternative approach would be to setRecord(undefined) before the fetch, but it is async and
  // we cannot be sure that the component wont be rendered (it will be at least once) with the
  // wrong data.


  const hasDifferentRecord = record && record.id && record.id.toString() !== recordId;

  if (loading || hasDifferentRecord) {
    const actionFromResource = resource.actions.find(r => r.name === actionName);
    return actionFromResource !== null && actionFromResource !== void 0 && actionFromResource.showInDrawer ? /*#__PURE__*/_react.default.createElement(_drawerPortal.default, null, /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null)) : /*#__PURE__*/_react.default.createElement(_designSystem.Loader, null);
  }

  if (!action) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoActionError, {
      resourceId: resourceId,
      actionName: actionName
    });
  }

  if (!record) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoRecordError, {
      resourceId: resourceId,
      recordId: recordId
    });
  }

  if (action.showInDrawer) {
    return /*#__PURE__*/_react.default.createElement(_drawerPortal.default, {
      width: action.containerWidth
    }, /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
      action: action,
      resource: resource,
      record: record
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_wrapper.default, {
    width: action.containerWidth
  }, /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: action,
    record: record,
    actionPerformed: response => handleActionPerformed(record, response)
  }), /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
    action: action,
    resource: resource,
    record: record
  }));
};

var _default = RecordAction;
exports.default = _default;