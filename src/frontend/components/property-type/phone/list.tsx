import React, { FC } from 'react'

import DefaultPropertyValue from '../default-type/default-property-value.js'
import allowOverride from '../../../hoc/allow-override.js'
import { ShowPropertyProps } from '../base-property-props.js'

const List: FC<ShowPropertyProps> = (props) => <DefaultPropertyValue {...props} />

export default allowOverride(List, 'DefaultPhoneListProperty')
