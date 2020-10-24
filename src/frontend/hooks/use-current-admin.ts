import { useDispatch, useSelector } from 'react-redux'
import { ReduxState } from '../store/store'
import { setCurrentAdmin } from '../store/actions/set-current-admin'
import { CurrentAdmin } from '../../current-admin.interface'

export type UseCurrentAdminResponse = [
  CurrentAdmin | null,
  (currentAdmin: CurrentAdmin | null) => CurrentAdmin | {}
]

/**
 * @classdesc
 * Hook which allows you to get and set currentAdmin
 *
 * ### Usage
 *
 * ```javascript
 * import { useCurrentAdmin } from 'admin-bro'
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
function useCurrentAdmin(): UseCurrentAdminResponse {
  const currentAdmin = useSelector((state: ReduxState) => state.session)
  const dispatch = useDispatch()
  return [
    currentAdmin,
    (admin: CurrentAdmin | null): any => dispatch(setCurrentAdmin(admin)),
  ]
}

export {
  useCurrentAdmin,
  useCurrentAdmin as default,
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
