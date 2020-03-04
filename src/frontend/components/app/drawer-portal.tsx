import { useEffect } from 'react'
import { createPortal } from 'react-dom'

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * @component
 * @subcategory Application
 */
const DrawerPortal: React.FC = ({ children }) => {
  const drawerElement = window.document.getElementById('drawerPortal') as Element
  useEffect(() => {
    drawerElement.classList.remove('hidden')
    return (): void => {
      drawerElement.classList.add('hidden')
    }
  }, [])

  return createPortal(
    children,
    drawerElement,
  )
}

export default DrawerPortal
