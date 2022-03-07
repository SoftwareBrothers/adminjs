"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.BaseActionComponent = void 0;

var _react = _interopRequireDefault(require("react"));

var _reactI18next = require("react-i18next");

var _designSystem = require("@adminjs/design-system");

var _errorBoundary = _interopRequireDefault(require("./error-boundary"));

var _actions = require("../actions");

var _constants = require("../../../constants");

var _hooks = require("../../hooks");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * Component which renders all the default and custom actions for both the Resource and the Record.
 *
 * It passes all props down to the actual Action component.
 *
 * Example of creating your own actions:
 * ```
 * // AdminJS options
 * const AdminJSOptions = {
 *   resources: [
 *      resource,
 *      options: {
 *        actions: {
 *           myNewAction: {
 *             label: 'amazing action',
 *             icon: 'Add',
 *             inVisible: (resource, record) => record.param('email') !== '',
 *             actionType: 'record',
 *             component: AdminJS.bundle('./my-new-action'),
 *             handler: (request, response, data) => {
 *               return {
 *                  ...
 *               }
 *             }
 *           }
 *        }
 *      }
 *   ]
 * }
 * ```
 *
 * ```
 * // ./my-new-action.jsx
 * import { Box } from 'adminjs'
 *
 * const MyNewAction = (props) => {
 *   const { resource, action, record } = props
 *   // do something with the props and render action
 *   return (
 *     <Box>Some Action Content</Box>
 *   )
 * }
 * ```
 *
 * @component
 * @name BaseActionComponent
 * @subcategory Application
 */
const BaseActionComponent = props => {
  const {
    resource,
    action,
    record,
    records,
    setTag
  } = props;
  const documentationLink = [_constants.DOCS, 'BaseAction.html'].join('/');
  const {
    translateMessage
  } = (0, _hooks.useTranslation)();
  let Action = _actions.actions[action.name];

  if (action.component) {
    Action = AdminJS.UserComponents[action.component];
  }

  if (Action) {
    return /*#__PURE__*/_react.default.createElement(_errorBoundary.default, null, /*#__PURE__*/_react.default.createElement(Action, {
      action: action,
      resource: resource,
      record: record,
      records: records,
      setTag: setTag
    }));
  }

  return Action || /*#__PURE__*/_react.default.createElement(_designSystem.MessageBox, {
    variant: "danger"
  }, translateMessage('noActionComponent'), /*#__PURE__*/_react.default.createElement(_reactI18next.Trans, {
    key: "messages.buttons.seeTheDocumentation"
  }, "See:", /*#__PURE__*/_react.default.createElement(_designSystem.Link, {
    ml: "default",
    href: documentationLink
  }, "the documentation")));
};

exports.BaseActionComponent = BaseActionComponent;
var _default = BaseActionComponent;
exports.default = _default;