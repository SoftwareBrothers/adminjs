"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.SelectedRecords = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _reactRouter = require("react-router");

var _interfaces = require("../../../interfaces");

var _getBulkActionsFromRecords = _interopRequireDefault(require("./utils/get-bulk-actions-from-records"));

var _hooks = require("../../../hooks");

var _actionsToButtonGroup = require("../action-header/actions-to-button-group");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const SelectedRecords = props => {
  const {
    resource,
    selectedRecords
  } = props;
  const {
    translateLabel
  } = (0, _hooks.useTranslation)();
  const history = (0, _reactRouter.useHistory)();
  const actionResponseHandler = (0, _hooks.useActionResponseHandler)();

  if (!selectedRecords || !selectedRecords.length) {
    return null;
  }

  const params = {
    resourceId: resource.id,
    recordIds: selectedRecords.map(records => records.id)
  };

  const handleActionClick = (event, sourceAction) => (0, _interfaces.buildActionClickHandler)({
    action: sourceAction,
    params,
    actionResponseHandler,
    push: history.push
  })(event);

  const bulkButtons = (0, _actionsToButtonGroup.actionsToButtonGroup)({
    actions: (0, _getBulkActionsFromRecords.default)(selectedRecords),
    params,
    handleClick: handleActionClick
  });
  return /*#__PURE__*/_react.default.createElement(_designSystem.TableCaption, null, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    py: "sm",
    alignItems: "center"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Title, {
    mr: "lg"
  }, translateLabel('selectedRecords', resource.id, {
    selected: selectedRecords.length
  })), /*#__PURE__*/_react.default.createElement(_designSystem.ButtonGroup, {
    size: "sm",
    rounded: true,
    buttons: bulkButtons
  })));
};

exports.SelectedRecords = SelectedRecords;
var _default = SelectedRecords;
exports.default = _default;