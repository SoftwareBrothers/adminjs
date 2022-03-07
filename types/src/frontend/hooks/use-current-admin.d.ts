import { CurrentAdmin } from '../../current-admin.interface';
export declare type UseCurrentAdminResponse = [CurrentAdmin | null, (currentAdmin: CurrentAdmin | null) => CurrentAdmin | {}];
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
declare function useCurrentAdmin(): UseCurrentAdminResponse;
export { useCurrentAdmin, useCurrentAdmin as default, };
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
