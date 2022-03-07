"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _booleanPropertyValue = _interopRequireDefault(require("./boolean-property-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Show extends _react.default.PureComponent {
  render() {
    const {
      property
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
      label: property.label
    }, /*#__PURE__*/_react.default.createElement(_booleanPropertyValue.default, this.props));
  }

}

exports.default = Show;