import React from 'react'

import { useTranslation } from '../../../hooks/use-translation'
import { flat } from '../../../../utils'
import { ShowPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const values = flat.get(record.params, property.path) || []
  const { translateProperty } = useTranslation()

  return (
    <span>{`${translateProperty('length')}: ${values.length}`}</span>
  )
}

export default allowOverride(List, 'DefaultArrayListProperty')
