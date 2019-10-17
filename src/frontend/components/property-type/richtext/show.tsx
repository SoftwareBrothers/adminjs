import React, { ReactNode } from 'react'
import PropertyInShow from '../../ui/property-in-show'
import { PropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<PropertyProps> {
  private contentRef: React.RefObject<any>

  constructor(props: PropertyProps) {
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
      <PropertyInShow property={property}>
        <div className="rich-text-value content" ref={this.contentRef} />
      </PropertyInShow>
    )
  }
}
