"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const AddNewItemButton = props => {
  const {
    resource,
    property
  } = props;
  const {
    translateProperty,
    translateButton
  } = (0, _hooks.useTranslation)();
  const label = translateProperty(`${property.path}.addNewItem`, resource.id, {
    defaultValue: translateButton('addNewItem', resource.id)
  });
  return /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement(_designSystem.Icon, {
    icon: "Add"
  }), label);
};

var _default = AddNewItemButton;
exports.default = _default;