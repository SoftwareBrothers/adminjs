import React from 'react'
import { FormGroup, Label, DatePicker } from '@adminjs/design-system'

import * as BackendFilter from '../../../../backend/utils/filter/filter'
import { useTranslation } from '../../../hooks/use-translation'
import { FilterPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

const { PARAM_SEPARATOR } = BackendFilter

const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, filter, onChange } = props
  const { translateProperty } = useTranslation()

  const fromKey = `${property.path}${PARAM_SEPARATOR}from`
  const toKey = `${property.path}${PARAM_SEPARATOR}to`
  const fromValue = filter[fromKey]
  const toValue = filter[toKey]

  return (
    <FormGroup variant="filter">
      <Label>{property.label}</Label>
      <Label>{`- ${translateProperty('from')}: `}</Label>
      <DatePicker
        value={fromValue}
        onChange={(date) => onChange(fromKey, date)}
        propertyType={property.type}
      />
      <Label mt="default">{`- ${translateProperty('to')}: `}</Label>
      <DatePicker
        value={toValue}
        onChange={(date) => onChange(toKey, date)}
        propertyType={property.type}
      />
    </FormGroup>
  )
}

export default allowOverride(Filter, 'DefaultDatetimeFilterProperty')
