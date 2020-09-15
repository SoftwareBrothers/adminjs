import { useDispatch } from 'react-redux'
import { toggleSidebar } from '../store/actions/sidebar'

/**
 * @memberof useSidebar
 * @alias Sidebar
 */
export interface Sidebar {
  toggleSidebar: () => any
}

/**
 * Hook which allows you to manipulate the sidebar.
 *
 * ```usage
 * import { useSidebar } from 'admin-bro'
 *
 * const myComponent = () => {
 *   const { toggleSidebar } = useSidebar()
 *   render (
 *     <Button onClick={() => toggleSidebar()}>Sidebar Open/close</Button>
 *   )
 * }
 * ```
 *
 * @component
 * @subcategory Hooks
 */
export const useSidebar = (): Sidebar => {
  const dispatch = useDispatch()
  return {
    toggleSidebar() { dispatch(toggleSidebar()) }
  }
}

export default useSidebar
