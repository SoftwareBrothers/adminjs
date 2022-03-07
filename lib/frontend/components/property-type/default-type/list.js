"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _defaultPropertyValue = _interopRequireDefault(require("./default-property-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class List extends _react.default.PureComponent {
  render() {
    return /*#__PURE__*/_react.default.createElement(_defaultPropertyValue.default, this.props);
  }

}

exports.default = List;