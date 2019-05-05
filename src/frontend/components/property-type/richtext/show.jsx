import React from 'react'
import PropertyInShow from '../../ui/property-in-show'
import { propertyType, recordType } from '../../../types'

export default class Show extends React.PureComponent {
  constructor(props) {
    super(props)
    this.contentRef = React.createRef()
  }

  componentDidMount() {
    const { property, record } = this.props
    const value = record.params[property.name]
    this.contentRef.current.innerHTML = value
  }

  render() {
    const { property } = this.props

    return (
      <PropertyInShow property={property}>
        <div className="rich-text-value content" ref={this.contentRef} />
      </PropertyInShow>
    )
  }
}


Show.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
}
