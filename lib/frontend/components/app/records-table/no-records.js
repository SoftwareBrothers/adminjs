"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoRecords = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../../hooks");

var _allowOverride = _interopRequireDefault(require("../../../hoc/allow-override"));

var _actionButton = _interopRequireDefault(require("../action-button/action-button"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const NoRecordsOriginal = props => {
  const {
    resource
  } = props;
  const {
    translateButton,
    translateMessage
  } = (0, _hooks.useTranslation)();
  const canCreate = resource.resourceActions.find(a => a.name === 'new');
  return /*#__PURE__*/_react.default.createElement(_designSystem.InfoBox, {
    title: translateMessage('noRecords', resource.id)
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    mb: "xxl"
  }, translateMessage('noRecordsInResource', resource.id)), canCreate ? /*#__PURE__*/_react.default.createElement(_actionButton.default, {
    action: canCreate,
    resourceId: resource.id
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Add"
  }), translateButton('createFirstRecord', resource.id))) : '');
}; // This hack prevents rollup from throwing an error


const NoRecords = (0, _allowOverride.default)(NoRecordsOriginal, 'NoRecords');
exports.NoRecords = NoRecords;
var _default = NoRecords;
exports.default = _default;