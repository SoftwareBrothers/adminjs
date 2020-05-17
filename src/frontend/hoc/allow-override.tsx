import React, { ComponentType } from 'react'

/**
 * @private
 *
 * Overrides one of the component form AdminBro core when user pass its name to
 * {@link AdminBro.bundle} method.
 *
 * If case of being overridden, component receives additional prop: `OriginalComponent`
 *
 * @example
 * AdminBro.bundle('./path/to/component', 'SidebarFooter')
 */
function allowOverride<P>(
  OriginalComponent: ComponentType<P>,
  name: string,
): ComponentType<P & {OriginalComponent?: ComponentType<P>}> {
  const WrapperComponent: React.FC<P> = (props) => {
    let globalAny: any = window
    globalAny = window

    let Component = OriginalComponent

    if (globalAny.AdminBro
      && globalAny.AdminBro.UserComponents
      && globalAny.AdminBro.UserComponents[name]
    ) {
      Component = globalAny.AdminBro.UserComponents[name]
      return <Component {...props} OriginalComponent={OriginalComponent} />
    }

    return <Component {...props} />
  }

  return WrapperComponent
}

export default allowOverride
