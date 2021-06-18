import React, { ComponentType } from 'react'
import { OverridableComponent } from '../utils/overridable-component'

/**
 * @private
 *
 * @classdesc
 * Overrides one of the component form AdminJS core when user pass its name to
 * {@link AdminJS.bundle} method.
 *
 * If case of being overridden, component receives additional prop: `OriginalComponent`
 *
 * @example
 * AdminJS.bundle('./path/to/component', 'SidebarFooter')
 */
function allowOverride<P>(
  OriginalComponent: ComponentType<P>,
  name: OverridableComponent,
): ComponentType<P & {OriginalComponent?: ComponentType<P>}> {
  // ssr
  if (typeof window === 'undefined') {
    return OriginalComponent
  }

  const WrapperComponent: React.FC<P> = (props) => {
    let globalAny: any = window
    globalAny = window

    let Component = OriginalComponent

    if (globalAny.AdminJS
      && globalAny.AdminJS.UserComponents
      && globalAny.AdminJS.UserComponents[name]
    ) {
      Component = globalAny.AdminJS.UserComponents[name]
      return <Component {...props} OriginalComponent={OriginalComponent} />
    }

    return <Component {...props} />
  }

  return WrapperComponent
}

export {
  allowOverride as default,
  allowOverride,
}
