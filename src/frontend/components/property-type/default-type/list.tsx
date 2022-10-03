import React from 'react'

import DefaultPropertyValue from './default-property-value'
import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'

const List: React.FC<ShowPropertyProps> = (props) => (<DefaultPropertyValue {...props} />)

export default allowOverride(List, 'DefaultListProperty')
