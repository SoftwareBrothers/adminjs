import React from 'react'

import BooleanPropertyValue from './boolean-property-value'
import { ShowPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

const List: React.FC<ShowPropertyProps> = (props) => (
  <BooleanPropertyValue {...props} />
)

export default allowOverride(List, 'DefaultBooleanListProperty')
