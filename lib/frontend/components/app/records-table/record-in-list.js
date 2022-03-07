"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.RecordInList = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouterDom = require("react-router-dom");

var _designSystem = require("@adminjs/design-system");

var _propertyType = _interopRequireDefault(require("../../property-type"));

var _interfaces = require("../../../interfaces");

var _display = require("./utils/display");

var _mergeRecordResponse = _interopRequireDefault(require("../../../hooks/use-record/merge-record-response"));

var _hooks = require("../../../hooks");

var _actionsToButtonGroup = require("../action-header/actions-to-button-group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const RecordInList = props => {
  const {
    resource,
    record: recordFromProps,
    actionPerformed,
    isLoading,
    onSelect,
    isSelected
  } = props;
  const [record, setRecord] = (0, _react.useState)(recordFromProps);
  const history = (0, _reactRouterDom.useHistory)();
  const handleActionCallback = (0, _react.useCallback)(actionResponse => {
    if (actionResponse.record && !actionResponse.redirectUrl) {
      setRecord((0, _mergeRecordResponse.default)(record, actionResponse));
    } else if (actionPerformed) {
      actionPerformed(actionResponse);
    }
  }, [actionPerformed, record]);
  const actionResponseHandler = (0, _hooks.useActionResponseHandler)(handleActionCallback);
  (0, _react.useEffect)(() => {
    setRecord(recordFromProps);
  }, [recordFromProps]);
  const {
    recordActions
  } = record;
  const show = record.recordActions.find(({
    name
  }) => name === 'show');
  const edit = record.recordActions.find(({
    name
  }) => name === 'edit');
  const action = show || edit;

  const handleClick = event => {
    const targetTagName = event.target.tagName.toLowerCase();

    if (action && targetTagName !== 'a' && targetTagName !== 'button' && targetTagName !== 'svg') {
      (0, _interfaces.buildActionClickHandler)({
        action,
        params: {
          resourceId: resource.id,
          recordId: record.id
        },
        actionResponseHandler,
        push: history.push
      })(event);
    }
  };

  const actionParams = {
    resourceId: resource.id,
    recordId: record.id
  };

  const handleActionClick = (event, sourceAction) => (0, _interfaces.buildActionClickHandler)({
    action: sourceAction,
    params: actionParams,
    actionResponseHandler,
    push: history.push
  })(event);

  const buttons = [{
    icon: 'OverflowMenuHorizontal',
    variant: 'light',
    label: undefined,
    'data-testid': 'actions-dropdown',
    buttons: (0, _actionsToButtonGroup.actionsToButtonGroup)({
      actions: recordActions,
      params: actionParams,
      handleClick: handleActionClick
    })
  }];
  return /*#__PURE__*/_react.default.createElement(_designSystem.TableRow, {
    onClick: handleClick,
    "data-id": record.id
  }, /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    className: isSelected ? 'selected' : 'not-selected'
  }, onSelect && record.bulkActions.length ? /*#__PURE__*/_react.default.createElement(_designSystem.CheckBox, {
    onChange: () => onSelect(record),
    checked: isSelected
  }) : null), resource.listProperties.map(property => /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    style: {
      cursor: 'pointer'
    },
    key: property.propertyPath,
    "data-property-name": property.propertyPath,
    display: (0, _display.display)(property.isTitle)
  }, isLoading ? /*#__PURE__*/_react.default.createElement(_designSystem.Placeholder, {
    style: {
      height: 14
    }
  }) : /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: "list",
    property: property,
    resource: resource,
    record: record
  }))), /*#__PURE__*/_react.default.createElement(_designSystem.TableCell, {
    key: "options"
  }, recordActions.length ? /*#__PURE__*/_react.default.createElement(_designSystem.ButtonGroup, {
    buttons: buttons
  }) : ''));
};

exports.RecordInList = RecordInList;
var _default = RecordInList;
exports.default = _default;