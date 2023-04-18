import React from 'react'

import ReferenceValue from './reference-value.js'
import { ShowPropertyProps } from '../base-property-props.js'
import allowOverride from '../../../hoc/allow-override.js'

const List: React.FC<ShowPropertyProps> = (props) => (
  <ReferenceValue {...props} />
)

export default allowOverride(List, 'DefaultReferenceListProperty')
