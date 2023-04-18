import React from 'react'

import BooleanPropertyValue from './boolean-property-value.js'
import { ShowPropertyProps } from '../base-property-props.js'
import allowOverride from '../../../hoc/allow-override.js'

const List: React.FC<ShowPropertyProps> = (props) => (
  <BooleanPropertyValue {...props} />
)

export default allowOverride(List, 'DefaultBooleanListProperty')
