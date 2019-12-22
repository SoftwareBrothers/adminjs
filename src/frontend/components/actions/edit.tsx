import React, { ReactNode } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import PropertyType from '../property-type'
import WrapperBox from '../ui/wrapper-box'
import StyledButton from '../ui/styled-button'
import ApiClient from '../../utils/api-client'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { ActionProps } from './action.props'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import recordToFormData from './record-to-form-data'

/**
 * @name EditAction
 * @category Actions
 * @description Shows form for updating a given record.
 * @private
 * @component
 */
class Edit extends React.Component<ActionProps & RouteComponentProps & AddNoticeProps, State> {
  private api: ApiClient

  constructor(props) {
    super(props)
    const { record } = props
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      record,
      loading: false,
    }
    this.api = new ApiClient()
  }

  handleChange(propertyOrRecord: RecordJSON | string, value?: any): void {
    if (typeof value === 'undefined' && (propertyOrRecord as RecordJSON).params) {
      this.setState({
        record: propertyOrRecord as RecordJSON,
      })
    } else {
      this.setState(state => ({
        record: {
          ...state.record,
          params: {
            ...state.record.params,
            [propertyOrRecord as string]: value,
          },
        },
      }))
    }
  }

  handleSubmit(event): boolean {
    const { resource, history, addNotice } = this.props
    const { record } = this.state

    const formData = recordToFormData(record)

    this.setState({ loading: true })

    this.api.recordAction({
      resourceId: resource.id,
      actionName: 'edit',
      recordId: record.id,
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      if (response.data.notice) {
        addNotice(response.data.notice)
      }
      if (response.data.redirectUrl) {
        history.push(response.data.redirectUrl)
      } else {
        this.setState(state => ({
          record: {
            ...state.record,
            errors: response.data.record.errors,
          },
          loading: false,
        }))
      }
    }).catch(() => {
      this.setState({ loading: false })
      addNotice({
        message: 'There was an error updating record, Check out console to see more information.',
        type: 'error',
      })
    })
    event.preventDefault()
    return false
  }

  render(): ReactNode {
    const { resource } = this.props
    const properties = resource.editProperties
    const { record, loading } = this.state

    return (
      <WrapperBox border>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {properties.map(property => (
            <PropertyType
              key={property.name}
              where={PropertyPlace.edit}
              onChange={this.handleChange}
              property={property}
              resource={resource}
              record={record}
            />
          ))}
          <StyledButton
            type="submit"
            className={`is-primary${loading ? ' is-loading' : ''}`}
          >
            <i className="icomoon-save" />
            <span className="btn-text">Save</span>
          </StyledButton>
        </form>
      </WrapperBox>
    )
  }
}

/**
 * @memberof Edit
 */
type State = {
  record: RecordJSON;
  loading: boolean;
}

export default withNotice(withRouter(Edit))
