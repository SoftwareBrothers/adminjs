"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));

var _errorMessage = _interopRequireDefault(require("../app/error-message"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Page extends _react.default.Component {
  constructor(props) {
    super(props);
    this.state = {
      isClient: false
    };
  }

  componentDidMount() {
    this.setState({
      isClient: true
    });
  }

  render() {
    const {
      pages,
      match
    } = this.props;
    const {
      params
    } = match;
    const {
      pageName
    } = params;
    const {
      isClient
    } = this.state;
    const currentPage = pages.find(page => page.name === pageName);

    if (!currentPage) {
      return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
        title: "There is no page of given name"
      }, /*#__PURE__*/_react.default.createElement("p", null, "Page:", /*#__PURE__*/_react.default.createElement("b", null, ` "${pageName}" `), "does not exist."));
    }

    const Component = AdminJS.UserComponents[currentPage.component];

    if (!Component || !isClient) {
      return /*#__PURE__*/_react.default.createElement(_errorMessage.default, {
        title: "No component specified"
      }, /*#__PURE__*/_react.default.createElement("p", null, "You have to specify component which will render this Page"));
    }

    return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(Component, null));
  }

}

const mapStateToProps = state => ({
  pages: state.pages
});

var _default = (0, _reactRedux.connect)(mapStateToProps)(Page);

exports.default = _default;