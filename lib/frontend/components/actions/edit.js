"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Edit = void 0;

var _react = _interopRequireWildcard(require("react"));

var _reactRouter = require("react-router");

var _designSystem = require("@adminjs/design-system");

var _propertyType = _interopRequireDefault(require("../property-type"));

var _actionHeader = _interopRequireDefault(require("../app/action-header/action-header"));

var _useRecord = _interopRequireDefault(require("../../hooks/use-record/use-record"));

var _appendForceRefresh = require("./utils/append-force-refresh");

var _useTranslation = require("../../hooks/use-translation");

var _layoutElementRenderer = _interopRequireDefault(require("./utils/layout-element-renderer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

const Edit = props => {
  const {
    record: initialRecord,
    resource,
    action
  } = props;
  const {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    setRecord
  } = (0, _useRecord.default)(initialRecord, resource.id);
  const {
    translateButton
  } = (0, _useTranslation.useTranslation)();
  const history = (0, _reactRouter.useHistory)();
  (0, _react.useEffect)(() => {
    if (initialRecord) {
      setRecord(initialRecord);
    }
  }, [initialRecord]);

  const submit = event => {
    event.preventDefault();
    handleSubmit().then(response => {
      if (response.data.redirectUrl) {
        history.push((0, _appendForceRefresh.appendForceRefresh)(response.data.redirectUrl), {
          previousPage: window.location.href
        });
      }
    });
    return false;
  };

  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    as: "form",
    onSubmit: submit,
    flex: true,
    flexGrow: 1,
    flexDirection: "column"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.DrawerContent, null, action !== null && action !== void 0 && action.showInDrawer ? /*#__PURE__*/_react.default.createElement(_actionHeader.default, props) : null, action.layout ? action.layout.map((layoutElement, i) => /*#__PURE__*/_react.default.createElement(_layoutElementRenderer.default // eslint-disable-next-line react/no-array-index-key
  , _extends({
    key: i,
    layoutElement: layoutElement
  }, props, {
    where: "edit",
    onChange: handleChange,
    record: record
  }))) : resource.editProperties.map(property => /*#__PURE__*/_react.default.createElement(_propertyType.default, {
    key: property.propertyPath,
    where: "edit",
    onChange: handleChange,
    property: property,
    resource: resource,
    record: record
  }))), /*#__PURE__*/_react.default.createElement(_designSystem.DrawerFooter, null, /*#__PURE__*/_react.default.createElement(_designSystem.Button, {
    variant: "primary",
    size: "lg",
    type: "submit",
    "data-testid": "button-save",
    disabled: loading
  }, loading ? /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Fade",
    spin: true
  }) : null, translateButton('save', resource.id))));
};

exports.Edit = exports.default = Edit;