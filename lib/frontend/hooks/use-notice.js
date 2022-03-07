"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useNotice = exports.default = void 0;

var _reactRedux = require("react-redux");

var _addNotice = require("../store/actions/add-notice");

/**
 * @classdesc
 * Hook which allows you to add notice message to the app.
 *
 * ```javascript
 * import { useNotice, Button } from 'adminjs'
 *
 * const myComponent = () => {
 *   const sendNotice = useNotice()
 *   render (
 *     <Button onClick={() => sendNotice({ message: 'I am awesome' })}>I am awesome</Button>
 *   )
 * }
 * ```
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @hideconstructor
 */
const useNotice = () => {
  const dispatch = (0, _reactRedux.useDispatch)();
  return notice => dispatch((0, _addNotice.addNotice)(notice));
};

exports.useNotice = useNotice;
var _default = useNotice;
exports.default = _default;