import React from 'react'
import { withRouter } from 'react-router-dom'

import PropertyType from '../property-type'
import ApiClient from '../../utils/api-client'
import { BorderBox, StyledButton } from '../layout'
import { resourceType, historyType, recordType } from '../../types'


class New extends React.Component {
  constructor(props) {
    super(props)
    const { record } = props
    this.api = new ApiClient()
    this.state = {
      params: (record && record.params) || {},
      errors: (record && record.errors) || {},
    }
  }

  handleChange(propertyName, value) {
    this.setState(state => ({
      params: {
        ...state.params,
        [propertyName]: value,
      },
    }))
  }

  handleSubmit(event) {
    const { resource, history } = this.props
    const { params } = this.state
    this.api.resourceAction({
      resourceId: resource.id,
      actionName: 'new',
      payload: {
        record: params,
      },
    }).then((response) => {
      if (response.data.redirectUrl) {
        history.push(response.data.redirectUrl)
      } else {
        this.setState({
          errors: response.data.record.errors,
        })
      }
    })
    event.preventDefault()
    return false
  }

  render() {
    const { resource } = this.props
    const { params, errors } = this.state
    const properties = resource.editProperties
    const record = { params, errors }
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
              record={record}
            />
          ))}
          <StyledButton as="button" type="submit" className="is-primary">
            <i className="icomoon-save" />
            <span className="btn-text">Save</span>
          </StyledButton>
        </form>
      </BorderBox>
    )
  }
}

New.propTypes = {
  resource: resourceType.isRequired,
  history: historyType.isRequired,
  record: recordType,
}

New.defaultProps = {
  record: null,
}

export default withRouter(New)
