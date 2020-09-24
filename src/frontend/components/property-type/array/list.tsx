import React from 'react'
import flat from 'flat'

import PropertyJSON from '../../../types/property-json.interface'
import RecordJSON from '../../../types/record-json.interface'
import ResourceJSON from '../../../types/resource-json.interface'
import { ShowPropertyProps } from '../base-property-props'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const unflatten = flat.unflatten(record.params) as Record<string, any>
  const values = unflatten[property.name] || []

  return (
    <span>{`length: ${values.length}`}</span>
  )
}

export default List
