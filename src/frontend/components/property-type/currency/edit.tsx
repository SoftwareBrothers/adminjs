import { CurrencyInput, FormGroup, FormMessage } from '@adminjs/design-system'
import React, { FC, memo } from 'react'
import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'
import allowOverride from '../../../hoc/allow-override'

const Edit: FC<EditPropertyProps> = (props) => {
  const { onChange, property, record } = props
  const propValue = record.params[property.path]
  const error = record.errors?.[property.path]

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <CurrencyInput
        id={property.path}
        name={property.path}
        value={propValue ?? ''}
        placeholder="<null>"
        onValueChange={(value) => onChange(property.path, value)}
        {...property.props}
      />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultCurrencyEditProperty')
