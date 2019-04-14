import React from 'react'
import PropertyType from '../property-type'
import ApiClient from '../../utils/api-client'
import { withRouter } from 'react-router-dom'
import { BorderBox, StyledBtn } from '../layout'

class New extends React.Component {
  constructor(props) {
    super(props)
    this.api = new ApiClient()
    this.state = {
      params: (props.record && props.record.params) || {},
      errors: (props.record && props.record.errors) || {},
    }
  }

  handleChange(propertyName, value) {
    this.setState({
      ...this.state,
      params: {
        ...this.state.params,
        [propertyName]: value,
      }
    })
  }

  handleSubmit(event){
    this.api.resourceAction({
      resourceId: this.props.resource.id,
      actionName: 'new',
      payload: {
        record: this.state.params,
      },
    }).then((response) => {
      if (response.data.redirectUrl) {
        this.props.history.push(response.data.redirectUrl)
      } else {
        this.setState({
          ...this.state,
          errors: response.data.record.errors,
        })
      }
    })
    event.preventDefault()
    return false
  }

  render() {
    const resource = this.props.resource
    const properties = this.props.resource.editProperties
    const record = { params: this.state.params, errors: this.state.errors }
    return (
      <BorderBox>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {properties.map(property => (
            <PropertyType
              key={property.name}
              where="edit"
              property={property}
              resource={resource}
              onChange={this.handleChange.bind(this)}
              record={record} />
          ))}
          <StyledBtn as="button" type="submit" className="is-primary">
            <i className="icomoon-save" />
            <span className="btn-text">Save</span>
          </StyledBtn>
        </form>
      </BorderBox>
    )
  }
}

export default withRouter(New)
