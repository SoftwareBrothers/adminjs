/* eslint-disable react/function-component-definition */
import React, { ComponentType } from 'react'
import { OverridableComponent } from '../utils/overridable-component'

/**
 * @private
 *
 * @classdesc
 * Overrides one of the component form AdminJS core when user pass its name to
 * {@link ComponentLoader.add} or {@link ComponentLoader.override} method.
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
      Component = window.AdminJS?.UserComponents?.[name]
        ?? (window as any).THEME?.Components?.[name]
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
