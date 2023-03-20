import React from 'react'

import DefaultPropertyValue from './default-property-value.js'
import allowOverride from '../../../hoc/allow-override.js'
import { ShowPropertyProps } from '../base-property-props.js'

const List: React.FC<ShowPropertyProps> = (props) => (<DefaultPropertyValue {...props} />)

export default allowOverride(List, 'DefaultListProperty')
