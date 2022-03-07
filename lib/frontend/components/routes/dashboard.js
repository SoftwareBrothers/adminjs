"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _defaultDashboard = _interopRequireDefault(require("../app/default-dashboard"));

var _errorBoundary = _interopRequireDefault(require("../app/error-boundary"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class Dashboard extends _react.default.Component {
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
      dashboard
    } = this.props;
    const {
      isClient
    } = this.state;
    let Component;

    if (dashboard && dashboard.component && isClient && AdminJS.UserComponents[dashboard.component]) {
      Component = AdminJS.UserComponents[dashboard.component];
    } else {
      Component = _defaultDashboard.default;
    }

    return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(Component, null));
  }

}

const mapStateToProps = state => ({
  dashboard: state.dashboard
});

var _default = (0, _reactRedux.connect)(mapStateToProps)(Dashboard);

exports.default = _default;