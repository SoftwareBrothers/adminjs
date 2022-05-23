import React, { FC } from 'react'

import { RecordJSON, ResourceJSON, PropertyJSON } from '../../../interfaces'
import DefaultPropertyValue from '../default-type/default-property-value'

interface Props {
  property: PropertyJSON;
  record: RecordJSON;
  resource: ResourceJSON;
}

const List: FC<Props> = props => <DefaultPropertyValue {...props} />

export default List
