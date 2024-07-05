import { CurrencyInputProps, FormGroup, FormMessage } from '@adminjs/design-system'
import React, { FC, memo } from 'react'

import { EditPropertyProps } from '../base-property-props.js'
import { recordPropertyIsEqual } from '../record-property-is-equal.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import allowOverride from '../../../hoc/allow-override.js'
import { CurrencyInputWrapper } from './currency-input-wrapper.js'
import { useTranslation } from '../../../hooks/index.js'

const Edit: FC<EditPropertyProps> = (props) => {
  const { onChange, property, record } = props
  const propValue = record.params?.[property.path] ?? ''
  const error = record.errors?.[property.path]
  const { tm } = useTranslation()

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <CurrencyInputWrapper
        id={property.path}
        initial={propValue}
        options={property.props as CurrencyInputProps}
        onChange={(value) => onChange(property.path, value)}
      />
      <FormMessage>{error && tm(error.message, property.resourceId)}</FormMessage>
    </FormGroup>
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultCurrencyEditProperty')
