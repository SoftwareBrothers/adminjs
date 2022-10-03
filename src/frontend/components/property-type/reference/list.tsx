import React from 'react'

import ReferenceValue from './reference-value'
import { ShowPropertyProps } from '../base-property-props'
import allowOverride from '../../../hoc/allow-override'

const List: React.FC<ShowPropertyProps> = (props) => (
  <ReferenceValue {...props} />
)

export default allowOverride(List, 'DefaultReferenceListProperty')
