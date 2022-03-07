"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = exports.useCurrentAdmin = useCurrentAdmin;

var _reactRedux = require("react-redux");

var _setCurrentAdmin = require("../store/actions/set-current-admin");

/**
 * @classdesc
 * Hook which allows you to get and set currentAdmin
 *
 * ### Usage
 *
 * ```javascript
 * import { useCurrentAdmin } from 'adminjs'
 *
 * const myComponent = () => {
 *   const [currentAdmin, setCurrentAdmin] = useCurrentAdmin()
 *   // ...
 * }
 * ```
 *
 * @class
 * @subcategory Hooks
 * @bundle
 * @returns {UseCurrentAdminResponse}
 * @hideconstructor
 */
function useCurrentAdmin() {
  const currentAdmin = (0, _reactRedux.useSelector)(state => state.session);
  const dispatch = (0, _reactRedux.useDispatch)();
  return [currentAdmin, admin => dispatch((0, _setCurrentAdmin.setCurrentAdmin)(admin))];
}
/**
 * Result of the {@link useCurrentAdmin}.
 * It is a tuple containing value and the setter
 *
 * @typedef {Array} UseCurrentAdminResponse
 * @memberof useCurrentAdmin
 * @alias UseCurrentAdminResponse
 * @property {CurrentAdmin | null} [0]    current admin
 * @property {React.Dispatch<React.SetStateAction<CurrentAdmin>>} [1]    value setter compatible
 *                                                                       with react useState
 */