"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Show extends _react.default.PureComponent {
  constructor(props) {
    super(props);
    this.contentRef = /*#__PURE__*/_react.default.createRef();
  }

  componentDidMount() {
    const {
      property,
      record
    } = this.props;
    const value = record.params[property.path];
    this.contentRef.current.innerHTML = value;
  }

  render() {
    const {
      property
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_designSystem.ValueGroup, {
      label: property.label
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Box, {
      variant: "grey",
      border: "default"
    }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
      ref: this.contentRef
    })));
  }

}

exports.default = Show;