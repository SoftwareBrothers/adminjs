"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.NoticeElement = exports.NoticeBox = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _designSystem = require("@adminjs/design-system");

var _dropNotice = require("../../store/actions/drop-notice");

var _setNoticeProgress = require("../../store/actions/set-notice-progress");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const TIME_TO_DISAPPEAR = 3;

class NoticeElement extends _react.default.Component {
  constructor(props) {
    super(props);
    const {
      notice
    } = props;
    this.timer = null;
    this.state = {
      progress: notice.progress || 0
    };
  }

  componentDidMount() {
    const {
      drop,
      notice,
      notifyProgress
    } = this.props;
    this.timer = setInterval(() => {
      this.setState(state => {
        const progress = state.progress + 100 / TIME_TO_DISAPPEAR;
        notifyProgress({
          noticeId: notice.id,
          progress
        });
        return {
          progress
        };
      });
    }, 1000);
    setTimeout(() => {
      if (this.timer) {
        clearInterval(this.timer);
      }

      drop();
    }, 1000 * (TIME_TO_DISAPPEAR + 1));
  }

  componentWillUnmount() {
    if (this.timer) {
      clearInterval(this.timer);
    }
  }

  render() {
    const {
      notice,
      drop
    } = this.props;
    return /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
      style: {
        minWidth: '480px'
      },
      message: notice.message,
      variant: notice.type === 'success' ? 'success' : 'danger',
      onCloseClick: drop
    });
  }

}

exports.NoticeElement = NoticeElement;

const NoticeBox = props => {
  const {
    drop,
    notices,
    notifyProgress
  } = props;
  const notice = notices.length ? notices[notices.length - 1] : null;

  if (notice) {
    return /*#__PURE__*/_react.default.createElement("div", {
      "data-testid": "notice-wrapper"
    }, /*#__PURE__*/_react.default.createElement(NoticeElement, {
      key: notice.id,
      notice: notice,
      drop: () => drop(notice.id),
      notifyProgress: notifyProgress
    }));
  }

  return /*#__PURE__*/_react.default.createElement("div", null);
};

const mapStateToProps = state => ({
  notices: state.notices
});

const mapDispatchToProps = dispatch => ({
  drop: noticeId => dispatch((0, _dropNotice.dropNotice)(noticeId)),
  notifyProgress: ({
    noticeId,
    progress
  }) => dispatch((0, _setNoticeProgress.setNoticeProgress)({
    noticeId,
    progress
  }))
});

const ConnectedNoticeBox = (0, _reactRedux.connect)(mapStateToProps, mapDispatchToProps)(NoticeBox);
exports.NoticeBox = exports.default = ConnectedNoticeBox;