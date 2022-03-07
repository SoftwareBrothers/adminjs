"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.withNotice = exports.default = void 0;

var _reactRedux = require("react-redux");

var _addNotice = require("../store/actions/add-notice");

/* eslint-disable @typescript-eslint/explicit-function-return-type */
const mapDispatchToProps = dispatch => ({
  addNotice: notice => dispatch((0, _addNotice.addNotice)(notice))
});
/**
 * Higher Order Component which allows you to post notice messages from your components
 *
 * It gives you the additional prop: `addNotice(noticeMessage)` taking {@link NoticeMessage}.
 *
 * ```javascript
 * import { withNotice } from 'adminjs/core'
 *
 * const MY_MESSAGE = {
 *   message: 'I am toast message',
 *   type: 'success',
 * }
 * const MyCustomComponent = ({ addNotice }) => {
 *   return (
 *     <a onClick={() => addNotice(MY_MESSAGE)}>Click Me</a>
 *   )
 * }
 * export default withNotice(MyCustomComponent)
 * ```
 *
 * @component
 * @subcategory HOC
 */


const withNotice = Component => (0, _reactRedux.connect)(null, mapDispatchToProps)(Component);

exports.withNotice = exports.default = withNotice;