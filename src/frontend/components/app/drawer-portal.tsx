import { useEffect, ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { DEFAULT_DRAWER_WIDTH } from '../../../constants'

/**
 * @alias DrawerPortalProps
 * @memberof DrawerPortal
 */
export type DrawerPortalProps = {
  /**
   * The drawer content
   */
  children: ReactNode;

  /**
   * Optional drawer width
   */
  width?: number | string | Array<number | string>;
}

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * @component
 * @subcategory Application
 */
const DrawerPortal: React.FC<DrawerPortalProps> = ({ children, width }) => {
  const drawerElement = window.document.getElementById('drawerPortal') as HTMLElement
  useEffect(() => {
    drawerElement.classList.remove('hidden')
    if (width) {
      drawerElement.style.width = Array.isArray(width) ? width[0].toString() : width.toString()
    }
    return (): void => {
      drawerElement.style.width = DEFAULT_DRAWER_WIDTH
      drawerElement.classList.add('hidden')
    }
  }, [])

  return createPortal(
    children,
    drawerElement,
  )
}

export default DrawerPortal
