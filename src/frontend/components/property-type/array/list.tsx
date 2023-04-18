import React from 'react'

import { useTranslation } from '../../../hooks/use-translation.js'
import { flat } from '../../../../utils/index.js'
import { ShowPropertyProps } from '../base-property-props.js'
import allowOverride from '../../../hoc/allow-override.js'

const List: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props
  const values = flat.get(record.params, property.path) || []
  const { translateProperty } = useTranslation()

  return (
    <span>{`${translateProperty('length')}: ${values.length}`}</span>
  )
}

export default allowOverride(List, 'DefaultArrayListProperty')
