import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import PropertyType from '../property-type'
import ApiClient from '../../utils/api-client'
import { BorderBox, StyledButton } from '../layout'
import { resourceType, historyType, recordType } from '../../types'
import withNotice from '../../store/with-notice'

class New extends React.Component {
  constructor(props) {
    super(props)
    const { record } = props
    this.api = new ApiClient()
    this.state = {
      record: {
        params: (record && record.params) || {},
        errors: (record && record.errors) || {},
        populated: (record && record.populated) || {},
      },
    }
  }

  handleChange(propertyOrRecord, value) {
    if (typeof value === 'undefined' && propertyOrRecord.params) {
      this.setState({
        record: propertyOrRecord,
      })
    } else {
      this.setState(state => ({
        record: {
          ...state.record,
          params: {
            ...state.record.params,
            [propertyOrRecord]: value,
          },
        },
      }))
    }
  }

  handleSubmit(event) {
    event.preventDefault()
    const { resource, history, addNotice } = this.props
    const { record } = this.state
    const { params } = record
    this.api.resourceAction({
      resourceId: resource.id,
      actionName: 'new',
      payload: {
        record: params,
      },
    }).then((response) => {
      if (response.data.redirectUrl) {
        addNotice({
          message: 'Record has been successfully created!',
        })
        history.push(response.data.redirectUrl)
      } else {
        addNotice({
          type: 'error',
          message: 'There were errors in the record object. Check them out',
        })
        this.setState(state => ({
          record: {
            ...state.record,
            errors: response.data.record.errors,
          },
        }))
      }
    })
    return false
  }

  render() {
    const { resource } = this.props
    const properties = resource.editProperties
    const { record } = this.state
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
  addNotice: PropTypes.func.isRequired,
}

New.defaultProps = {
  record: null,
}

export default withNotice(withRouter(New))
