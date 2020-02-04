import React, { ReactNode } from 'react'
import { FormGroup, Label } from '../../design-system'
import { EditPropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<EditPropertyProps> {
  private contentRef: React.RefObject<any>

  constructor(props: EditPropertyProps) {
    super(props)
    this.contentRef = React.createRef()
  }

  componentDidMount(): void {
    const { property, record } = this.props
    const value = record.params[property.name]
    this.contentRef.current.innerHTML = value
  }

  render(): ReactNode {
    const { property } = this.props

    return (
      <FormGroup>
        <Label>{property.label}</Label>
        <div className="rich-text-value content" ref={this.contentRef} />
      </FormGroup>
    )
  }
}
