import React from 'react'
import PropertyType from '../property-type'
import { Loader, BorderBox } from '../layout'
import ApiClient from '../../utils/api-client'

export default class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      record: { params: {}, populated: {} },
    }
  }

  componentDidMount() {
    const api = new ApiClient()
    api.recordAction({
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
    const { record, isLoading } = this.state
    const properties = resource.showProperties

    if (isLoading) {
      return (
        <Loader />
      )
    }

    return (
      <BorderBox>
        {properties.map(property => (
          <PropertyType
            key={property.name}
            where="show"
            property={property}
            resource={resource}
            record={record}
          />
        ))}
      </BorderBox>
    )
  }
}
