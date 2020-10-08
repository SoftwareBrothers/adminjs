import React from 'react'
import { FormGroup, Label, DatePicker } from '@admin-bro/design-system'

import * as BackendFilter from '../../../../backend/utils/filter/filter'
import { FilterPropertyProps } from '../base-property-props'

const { PARAM_SEPARATOR } = BackendFilter


const Filter: React.FC<FilterPropertyProps> = (props) => {
  const { property, filter, onChange } = props

  const fromKey = `${property.path}${PARAM_SEPARATOR}from`
  const toKey = `${property.path}${PARAM_SEPARATOR}to`
  const fromValue = filter[fromKey]
  const toValue = filter[toKey]

  return (
    <React.Fragment>
      <FormGroup variant="filter">
        <Label>{property.label}</Label>
        <Label>- From: </Label>
        <DatePicker
          value={fromValue}
          onChange={(data: string): void => onChange(fromKey, data)}
          propertyType={property.type}
        />
        <Label mt="default">- To: </Label>
        <DatePicker
          value={toValue}
          onChange={(data: string): void => onChange(toKey, data)}
          propertyType={property.type}
        />
      </FormGroup>
    </React.Fragment>
  )
}

export default Filter
