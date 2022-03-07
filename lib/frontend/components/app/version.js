"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.Version = void 0;

var _react = _interopRequireDefault(require("react"));

var _styledComponents = _interopRequireDefault(require("styled-components"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const VersionItem = (0, _styledComponents.default)(_designSystem.Text).withConfig({
  displayName: "version__VersionItem",
  componentId: "r49gcr-0"
})(["padding:12px 24px 12px 0;"]);
VersionItem.defaultProps = {
  display: ['none', 'block'],
  color: 'grey100'
};

const Version = props => {
  const {
    versions
  } = props;
  const {
    admin,
    app
  } = versions;
  const {
    translateLabel
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
    flex: true,
    flexGrow: 1,
    py: "default",
    px: "xxl",
    className: (0, _designSystem.cssClass)('Version')
  }, admin && /*#__PURE__*/_react.default.createElement(VersionItem, null, translateLabel('adminVersion', {
    version: admin
  })), app && /*#__PURE__*/_react.default.createElement(VersionItem, null, translateLabel('appVersion', {
    version: app
  })));
};

exports.Version = Version;
var _default = Version;
exports.default = _default;