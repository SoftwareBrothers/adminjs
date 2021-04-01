import React from 'react'

import { useTranslation } from 'src/frontend/hooks'

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
  const { translateMessage } = useTranslation()

  return (
    <span>{`${translateMessage('lengthProperty')}: ${values.length}`}</span>
  )
}

export default List
