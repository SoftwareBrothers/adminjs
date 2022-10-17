import React, { useEffect, ReactNode, useState } from 'react'
import { createPortal } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { Drawer, DEFAULT_DRAWER_WIDTH } from '@adminjs/design-system'
import { ThemeProvider } from 'styled-components'

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

export type DrawerWrapperProps = {
  onMount: () => void;
}

const DRAWER_PORTAL_ID = 'drawerPortal'
const DRAWER_PORTAL_WRAPPER_ID = 'drawerPortalWrapper'

const DrawerWrapper: React.FC<DrawerWrapperProps> = ({ onMount }) => {
  useEffect(() => {
    onMount()
  }, [])
  return (
    <ThemeProvider theme={(window as any).THEME}>
      <Drawer id={DRAWER_PORTAL_ID} className="hidden" data-css="drawer" />
    </ThemeProvider>
  )
}

const getOrCreatePortalContainer = (id: string) => {
  let container = document.getElementById(id)

  if (!container) {
    container = window.document.createElement('div')
    container.id = id
    window.document.body.appendChild(container)
  }

  return container
}

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * ### Usage
 *
 * ```
 * import { DrawerPortal } from 'adminjs'
 * ```
 *
 * @component
 * @subcategory Application
 */
export const DrawerPortal: React.FC<DrawerPortalProps> = ({ children, width }) => {
  const [drawerElement, setDrawerElement] = useState(document.getElementById(DRAWER_PORTAL_ID))

  const handleDrawerMount = () => {
    setDrawerElement(document.getElementById(DRAWER_PORTAL_ID))
  }

  useEffect(() => {
    const innerWrapperElement = getOrCreatePortalContainer(DRAWER_PORTAL_WRAPPER_ID)
    if (!drawerElement && window) {
      const drawerRoot = createRoot(innerWrapperElement)
      drawerRoot.render(<DrawerWrapper onMount={handleDrawerMount} />)
    }

    return () => {
      const innerWrapper = document.getElementById(DRAWER_PORTAL_WRAPPER_ID)
      if (innerWrapper) document.body.removeChild(innerWrapper)
    }
  }, [])

  useEffect(() => {
    if (drawerElement) {
      drawerElement.classList.remove('hidden')
      if (width) {
        drawerElement.style.width = Array.isArray(width)
          ? width[0].toString()
          : width.toString()
      }
      return (): void => {
        drawerElement.style.width = DEFAULT_DRAWER_WIDTH
        drawerElement.classList.add('hidden')
        drawerElement.setAttribute('data-css', 'drawer-element')
      }
    }
    return () => undefined
  }, [drawerElement])

  if (!drawerElement) {
    return null
  }

  return createPortal(
    children,
    drawerElement,
  )
}

export default DrawerPortal
