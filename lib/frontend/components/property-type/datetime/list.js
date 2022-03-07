"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _mapValue = _interopRequireDefault(require("./map-value"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class List extends _react.default.PureComponent {
  render() {
    const {
      property,
      record
    } = this.props;
    const value = (0, _mapValue.default)(record.params[property.path], property.type);
    return /*#__PURE__*/_react.default.createElement("span", null, value);
  }

}

exports.default = List;