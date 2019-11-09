import React, { ReactNode, ComponentClass } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import PropertyType from '../property-type'
import ApiClient from '../../utils/api-client'
import WrapperBox from '../ui/wrapper-box'
import StyledButton from '../ui/styled-button'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import { ActionProps } from './action.props'
import { NoticeType } from '../../store/store'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

type State = {
  record: RecordJSON;
}

/**
 * @name NewAction
 * @category Actions
 * @description Shows form for creating a given record.
 * @component
 * @private
 */
class New extends React.Component<ActionProps & AddNoticeProps & RouteComponentProps, State> {
  private api: ApiClient

  constructor(props) {
    super(props)
    const { record } = props
    this.api = new ApiClient()
    this.handleChange = this.handleChange.bind(this)
    this.state = {
      record: {
        ...record,
        params: (record && record.params) || {},
        errors: (record && record.errors) || {},
        populated: (record && record.populated) || {},
      },
    }
  }

  handleChange(propertyOrRecord: string | RecordJSON, value?: string): void {
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
          type: NoticeType.error,
          message: 'There were errors in the record object. Check them out',
        })
        this.setState(state => ({
          record: {
            ...state.record,
            errors: response.data.record.errors,
          },
        }))
      }
    }).catch(() => {
      addNotice({
        message: 'There was an error creating record, Check out console to see more information.',
        type: NoticeType.error,
      })
    })
    return false
  }

  render(): ReactNode {
    const { resource } = this.props
    const properties = resource.editProperties
    const { record } = this.state
    return (
      <WrapperBox border>
        <form onSubmit={this.handleSubmit.bind(this)}>
          {properties.map(property => (
            <PropertyType
              key={property.name}
              where={PropertyPlace.edit}
              property={property}
              resource={resource}
              onChange={this.handleChange}
              record={record}
            />
          ))}
          <StyledButton type="submit" className="is-primary">
            <i className="icomoon-save" />
            <span className="btn-text">Save</span>
          </StyledButton>
        </form>
      </WrapperBox>
    )
  }
}

// TODO remove this hack
export default withNotice(withRouter(New)) as unknown as ComponentClass<ActionProps>
