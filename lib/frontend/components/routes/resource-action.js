"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactRedux = require("react-redux");

var _baseActionComponent = _interopRequireDefault(require("../app/base-action-component"));

var _errorMessage = require("../app/error-message");

var _app = require("../app");

var _wrapper = _interopRequireDefault(require("./utils/wrapper"));

var _drawerPortal = _interopRequireDefault(require("../app/drawer-portal"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const ResourceAction = props => {
  const {
    resources,
    match
  } = props;
  const {
    resourceId,
    actionName
  } = match.params;
  const resource = resources.find(r => r.id === resourceId);

  if (!resource) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoResourceError, {
      resourceId: resourceId
    });
  }

  const action = resource.resourceActions.find(r => r.name === actionName);

  if (!action) {
    return /*#__PURE__*/_react.default.createElement(_errorMessage.NoActionError, {
      resourceId: resourceId,
      actionName: actionName
    });
  }

  if (action.showInDrawer) {
    return /*#__PURE__*/_react.default.createElement(_drawerPortal.default, {
      width: action.containerWidth
    }, /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
      action: action,
      resource: resource
    }));
  }

  return /*#__PURE__*/_react.default.createElement(_wrapper.default, {
    width: action.containerWidth
  }, /*#__PURE__*/_react.default.createElement(_app.ActionHeader, {
    resource: resource,
    action: action
  }), /*#__PURE__*/_react.default.createElement(_baseActionComponent.default, {
    action: action,
    resource: resource
  }));
};

const mapStateToProps = state => ({
  resources: state.resources
});

var _default = (0, _reactRedux.connect)(mapStateToProps)(ResourceAction);

exports.default = _default;