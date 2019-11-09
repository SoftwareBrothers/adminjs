import React, { ReactNode, ComponentClass } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import PropertyType from '../property-type'
import WrapperBox from '../ui/wrapper-box'
import StyledButton from '../ui/styled-button'
import ApiClient from '../../utils/api-client'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { NoticeType } from '../../store/store'
import { ActionProps } from './action.props'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'

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
        message: 'There was an error updating record, Check out console to see more information.',
        type: NoticeType.error,
      })
    })
    event.preventDefault()
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
              onChange={this.handleChange}
              property={property}
              resource={resource}
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

/**
 * @memberof Edit
 */
type State = {
  record: RecordJSON;
}

// TODO: remove this hack
export default withNotice(withRouter(Edit)) as unknown as ComponentClass<ActionProps>
