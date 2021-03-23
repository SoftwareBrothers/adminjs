import React, { ReactNode } from 'react'
import { Box, Label } from '@admin-bro/design-system'

import { ShowPropertyProps } from '../base-property-props'
import DefaultPropertyValue from './default-property-value'

export default class Show extends React.PureComponent<ShowPropertyProps> {
  render(): ReactNode {
    const { property } = this.props
    return (
      <Box mb="xl">
        {property.hideLabel ? null : <Label variant="light">{property.label}</Label>}
        <DefaultPropertyValue {...this.props} />
      </Box>
    )
  }
}
