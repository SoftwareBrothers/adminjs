import React, { FC, useMemo } from 'react'

import { BasePropertyProps } from './base-property-props.js'
import { BasePropertyComponent } from './base-property-component.js'
/**
 * This component is the same as `BasePropertyComponent` but it will not render
 * custom components. Use this in your custom components to render the default
 * property component.
 *
 * This is useful if you want your custom component to appear custom only for
 * specific `where` value and default for all others.
 */
const CleanPropertyComponent: FC<BasePropertyProps> = (props) => {
  const { property } = props
  const cleanProperty = useMemo(() => ({ ...property, components: {} }), [property])

  return <BasePropertyComponent {...props} property={cleanProperty} />
}

export default CleanPropertyComponent
