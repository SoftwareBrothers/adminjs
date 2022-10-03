import React, { FC } from 'react'

import DefaultPropertyValue from '../default-type/default-property-value'
import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'

const List: FC<ShowPropertyProps> = (props) => <DefaultPropertyValue {...props} />

export default allowOverride(List, 'DefaultPhoneListProperty')
