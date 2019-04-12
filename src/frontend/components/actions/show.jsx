import React from 'react'
import PropertyType from '../property-type'
import { Loader } from '../layout'
import ApiClient from '../../utils/api-client'

export default class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      record: { params: {}, populated: {} }
    }
    this.api = new ApiClient()
  }

  componentDidMount() {
    this.api.recordAction({
      resourceId: this.props.resource.id,
      actionName: this.props.action.name,
      recordId: this.props.recordId,
    }).then((response) => {
      this.setState({
        isLoading: false,
        record: response.data.record,
      })
    })
  }

  render() {
    const { resource } = this.props
    const properties = resource.showProperties
    const record = this.state.record

    if (this.state.isLoading) {
      return (
        <Loader />
      )
    }

    return (
      <div className="border-box">
        {properties.map(property => (
          <PropertyType
            key={property.name}
            where="show"
            property={property}
            resource={resource}
            record={record} />
        ))}
      </div>
    )
  }
}