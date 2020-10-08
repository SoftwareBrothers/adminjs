import React, { ReactNode } from 'react'
import { ValueGroup, Text, Box } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  private contentRef: React.RefObject<any>

  constructor(props: EditPropertyProps) {
    super(props)
    this.contentRef = React.createRef()
  }

  componentDidMount(): void {
    const { property, record } = this.props
    const value = record.params[property.path]
    this.contentRef.current.innerHTML = value
  }

  render(): ReactNode {
    const { property } = this.props

    return (
      <ValueGroup label={property.label}>
        <Box variant="grey" border="default">
          <Text ref={this.contentRef} />
        </Box>
      </ValueGroup>
    )
  }
}
