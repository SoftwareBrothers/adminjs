"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _utils = require("../../../../utils");

var _convertToSubProperty = require("./convert-to-sub-property");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _extends() { _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; }; return _extends.apply(this, arguments); }

class Show extends _react.default.PureComponent {
  render() {
    const {
      property,
      record,
      ItemComponent
    } = this.props;
    const items = _utils.flat.get(record.params, property.path) || [];
    return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
      label: property.label
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Section, null, (items || []).map((item, i) => {
      const itemProperty = (0, _convertToSubProperty.convertToSubProperty)(property, i);
      return /*#__PURE__*/_react.default.createElement(ItemComponent, _extends({}, this.props, {
        key: itemProperty.path,
        property: itemProperty
      }));
    })));
  }

}

exports.default = Show;