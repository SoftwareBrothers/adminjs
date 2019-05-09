import React from 'react'
import { withRouter } from 'react-router-dom'
import PropTypes from 'prop-types'

import PropertyType from '../property-type'
import WrapperBox from '../ui/wrapper-box'
import StyledButton from '../ui/styled-button'
import { resourceType, recordType, historyType } from '../../types'
import ApiClient from '../../utils/api-client'
import withNotice from '../../store/with-notice'

/**
 * @name EditAction
 * @category Actions
 * @description Shows form for updating a given record.
 * @private
 * @component
 */
class Edit extends React.Component {
  constructor(props) {
    super(props)
    const { record } = props
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      record,
    }
    this.api = new ApiClient()
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
    const { resource, history, addNotice } = this.props
    const { record } = this.state
    this.api.recordAction({
      resourceId: resource.id,
      actionName: 'edit',
      recordId: record.id,
      payload: {
        record: record.params,
      },
    }).then((response) => {
      if (response.data.redirectUrl) {
        history.push(response.data.redirectUrl)
        addNotice({
          message: 'Record has been successfully updated!',
        })
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
    event.preventDefault()
    return false
  }

  render() {
    const { resource } = this.props
    const properties = resource.editProperties
    const { record } = this.state

    return (
      <WrapperBox border>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {properties.map(property => (
            <PropertyType
              key={property.name}
              where="edit"
              onChange={this.handleChange}
              property={property}
              resource={resource}
              record={record}
            />
          ))}
          <StyledButton as="button" type="submit" className="is-primary">
            <i className="icomoon-save" />
            <span className="btn-text">Save</span>
          </StyledButton>
        </form>
      </WrapperBox>
    )
  }
}

Edit.propTypes = {
  /**
   * Object of type: {@link BaseResource~JSON}
   */
  resource: resourceType.isRequired,
  /**
   * Object of type: {@link Action~JSON}
   */
  record: recordType.isRequired,
  /**
   * history object used by ReactRouter
   */
  history: historyType.isRequired,
  /**
   * Function which adds a new `notice` information.
   */
  addNotice: PropTypes.func.isRequired,
}

export default withNotice(withRouter(Edit))
