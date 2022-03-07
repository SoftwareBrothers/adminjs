"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoResourceError = exports.NoRecordError = exports.NoActionError = exports.ErrorMessageBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @class
 * Prints error message
 *
 * @component
 * @private
 * @example
 * return (
 * <ErrorMessageBox title={'Some error'}>
 *   <p>Text below the title</p>
 * </ErrorMessageBox>
 * )
 */
const ErrorMessageBox = props => {
  const {
    children,
    title,
    testId
  } = props;
  return /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    "data-testid": testId,
    message: title
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, children));
};

exports.default = exports.ErrorMessageBox = ErrorMessageBox;

const NoResourceError = props => {
  const {
    resourceId
  } = props;
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    message: "404 - PAGE NOT FOUND",
    "data-testid": "NoResourceError",
    variant: "info",
    m: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('error404Resource', resourceId, {
    resourceId
  })));
};

exports.NoResourceError = NoResourceError;

const NoActionError = props => {
  const {
    resourceId,
    actionName
  } = props;
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    message: "404 - PAGE NOT FOUND",
    "data-testid": "NoActionError",
    variant: "info",
    m: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('error404Action', resourceId, {
    resourceId,
    actionName
  })));
};

exports.NoActionError = NoActionError;

const NoRecordError = props => {
  const {
    resourceId,
    recordId
  } = props;
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    message: "404 - PAGE NOT FOUND",
    "data-testid": "NoRecordError",
    variant: "info",
    m: "xxl"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, translateMessage('error404Record', resourceId, {
    resourceId,
    recordId
  })));
};

exports.NoRecordError = NoRecordError;