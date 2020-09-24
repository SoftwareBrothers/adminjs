import React from 'react'
import flat from 'flat'

import { RecordJSON, ResourceJSON, PropertyJSON } from '../../../interfaces'
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
