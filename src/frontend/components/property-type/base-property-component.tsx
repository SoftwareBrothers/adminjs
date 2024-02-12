import { Box } from '@adminjs/design-system'
import { ReactComponentLike } from 'prop-types'
import React, { useMemo } from 'react'

import ErrorBoundary from '../app/error-boundary.js'
import * as ArrayType from './array/index.js'
import * as KeyValueType from './key-value/index.js'
import * as MixedType from './mixed/index.js'
import { PropertyType } from '../../../backend/adapters/property/base-property.js'
import { PropertyJSON } from '../../interfaces/index.js'
import { getActionElementCss } from '../../utils/index.js'
import { BasePropertyComponentProps } from './base-property-props.js'
import * as boolean from './boolean/index.js'
import * as currency from './currency/index.js'
import * as datetime from './datetime/index.js'
import * as defaultType from './default-type/index.js'
import * as password from './password/index.js'
import * as phone from './phone/index.js'
import * as reference from './reference/index.js'
import * as richtext from './richtext/index.js'
import * as textarea from './textarea/index.js'

let globalAny: any = {}

try {
  globalAny = window
} catch (error) {
  if (!(error instanceof ReferenceError)) {
    throw error
  }
}

const types: Record<PropertyType, any> = {
  textarea,
  boolean,
  datetime,
  reference,
  password,
  date: datetime,
  richtext,
  string: defaultType,
  number: defaultType,
  float: defaultType,
  uuid: defaultType,
  mixed: null,
  'key-value': null,
  currency,
  phone,
}

/**
 * @load ./base-property-component.doc.md
 * @component
 * @name BasePropertyComponent
 * @subcategory Application
 * @class
 * @hideconstructor
 */
const BasePropertyComponent: React.FC<BasePropertyComponentProps> = (props) => {
  const { property: baseProperty, resource, record, filter, where, onChange } = props

  const property: PropertyJSON = useMemo(() => ({
    ...baseProperty,
    // we fill the path if it is not there. That is why all the actual Component Renderers are
    // called with the path set to this root path. Next mixed and array components adds to this
    // path either index (for array) or subProperty name.
    path: (baseProperty as PropertyJSON).path || baseProperty.propertyPath,
  }), [baseProperty])

  const testId = `property-${where}-${property.path}`
  const contentTag = getActionElementCss(resource.id, where, property.path)

  let Component: ReactComponentLike = (types[property.type] && types[property.type][where])
    || defaultType[where]

  if (property.components && property.components[where]) {
    const component = property.components[where]
    if (!component) {
      throw new Error(`there is no "${property.path}.components.${where}"`)
    }
    Component = globalAny.AdminJS.UserComponents[component] ?? (() => {
      throw new Error(`Component "${component}" has not been bundled, ensure it was added to your ComponentLoader instance (the one included in AdminJS options).`)
    })
    return (
      <ErrorBoundary>
        <Box data-css={contentTag} data-testid={testId}>
          <Component
            property={property}
            resource={resource}
            record={record}
            filter={filter}
            onChange={onChange}
            where={where}
          />
        </Box>
      </ErrorBoundary>
    )
  }

  const Array = ArrayType[where]
  const Mixed = MixedType[where]
  const KeyValue = KeyValueType[where]

  if (baseProperty.isArray) {
    if (!Array) { return (<div />) }
    return (
      <Array
        {...props}
        property={property}
        ItemComponent={BasePropertyComponent}
        testId={testId}
      />
    )
  }

  if (baseProperty.type === 'key-value') {
    if (!KeyValue) { return (<div />) }
    return (
      <KeyValue
        {...props}
        property={property}
        testId={testId}
      />
    )
  }

  if (baseProperty.type === 'mixed') {
    if (!Mixed) { return (<div />) }
    return (
      <Mixed
        {...props}
        property={property}
        ItemComponent={BasePropertyComponent}
        testId={testId}
      />
    )
  }

  return (
    <ErrorBoundary>
      <Box data-css={contentTag} data-testid={testId}>
        <Component
          property={property}
          resource={resource}
          record={record}
          filter={filter}
          onChange={onChange}
          where={where}
        />
      </Box>
    </ErrorBoundary>
  )
}
export {
  BasePropertyComponent as default,
  BasePropertyComponent,
}
