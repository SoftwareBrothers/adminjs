import React, { useEffect, ReactNode, useState } from 'react'
import { createPortal, render } from 'react-dom'
import { Drawer, DEFAULT_DRAWER_WIDTH } from '@admin-bro/design-system'
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

const DRAWER_PORTAL_ID = 'drawerPortal'

/**
 * Shows all of its children in a Drawer on the right.
 * Instead of rendering it's own {@link Drawer} component it reuses
 * the global Drawer via React Portal.
 *
 * ### Usage
 *
 * ```
 * import { DrawerPortal } from 'admin-bro'
 * ```
 *
 * @component
 * @subcategory Application
 */
export const DrawerPortal: React.FC<DrawerPortalProps> = ({ children, width }) => {
  const [drawerElement, setDrawerElement] = useState<HTMLElement | null>(
    window.document.getElementById(DRAWER_PORTAL_ID),
  )
  if (!drawerElement && window) {
    const innerWrapper = window.document.createElement('div')
    const DrawerWrapper = (
      <ThemeProvider theme={(window as any).THEME}>
        <Drawer id={DRAWER_PORTAL_ID} className="hidden" />
      </ThemeProvider>
    )
    window.document.body.appendChild(innerWrapper)
    render(DrawerWrapper, innerWrapper, () => {
      setDrawerElement(window.document.getElementById(DRAWER_PORTAL_ID))
    })
  }

  useEffect(() => {
    if (drawerElement) {
      drawerElement.classList.remove('hidden')
      if (width) {
        drawerElement.style.width = Array.isArray(width) ? width[0].toString() : width.toString()
      }
      return (): void => {
        drawerElement.style.width = DEFAULT_DRAWER_WIDTH
        drawerElement.classList.add('hidden')
      }
    }
    return (): void => undefined
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
