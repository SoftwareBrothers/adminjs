"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.ErrorBoundary = void 0;

var _react = _interopRequireDefault(require("react"));

var _designSystem = require("@adminjs/design-system");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ErrorMessage = ({
  error
}) => {
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  return /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    m: "xxl",
    variant: "danger",
    message: "Javascript Error"
  }, /*#__PURE__*/_react.default.createElement(_designSystem.Text, null, error.toString()), /*#__PURE__*/_react.default.createElement(_designSystem.Text, {
    mt: "default"
  }, translateMessage('seeConsoleForMore')));
};

class ErrorBoundary extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      error: null
    };
  }

  componentDidCatch(error) {
    this.setState({
      error
    });
  }

  render() {
    const {
      children
    } = this.props;
    const {
      error
    } = this.state;

    if (error !== null) {
      return /*#__PURE__*/_react.default.createElement(ErrorMessage, {
        error: error
      });
    }

    return children || null;
  }

}

exports.ErrorBoundary = ErrorBoundary;
var _default = ErrorBoundary;
exports.default = _default;