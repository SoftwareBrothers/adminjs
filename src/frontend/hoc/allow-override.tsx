/* eslint-disable react/function-component-definition */
import React, { ComponentType } from 'react'

import { OverridableComponent } from '../utils/overridable-component.js'

/**
 * @private
 *
 * @classdesc
 * Overrides one of the AdminJS core components when user passes it's name to ComponentLoader
 *
 * If case of being overridden, component receives additional prop: `OriginalComponent`
 *
 * @example
 * new ComponentLoader().override('SidebarFooter', MySidebarFooter)
 */
function allowOverride<P extends Record<string, unknown>>(
  OriginalComponent: ComponentType<P>,
  name: OverridableComponent,
): ComponentType<P & {OriginalComponent?: ComponentType<P>}> {
  const WrapperComponent = (props: P) => {
    let Component = OriginalComponent

    /**
     * @new in version 6.3
     *
     * This adds support for future theme-specific components via their "theme.bundle.js"
     *
     */
    if (typeof window !== 'undefined') {
      Component = (window as any).AdminJS?.UserComponents?.[name]
        ?? (window as any).THEME_COMPONENTS?.[name]
        ?? OriginalComponent
    }

    return <Component {...props} OriginalComponent={OriginalComponent} />
  }

  return WrapperComponent
}

export {
  allowOverride as default,
  allowOverride,
}
