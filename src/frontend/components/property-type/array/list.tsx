import React from 'react'
import { flat } from '../../../../utils'

import { RecordJSON, ResourceJSON, PropertyJSON } from '../../../interfaces'
import { ShowPropertyProps } from '../base-property-props'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const values = flat.get(record.params, property.path) || []

  return (
    <span>{`length: ${values.length}`}</span>
  )
}

export default List
