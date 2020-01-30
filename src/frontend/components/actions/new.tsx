import React, { ReactNode, ComponentClass } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import PropertyType from '../property-type'
import ApiClient from '../../utils/api-client'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import { ActionProps } from './action.props'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import recordToFormData from './record-to-form-data'
import { appendForceRefresh } from './utils/append-force-refresh'
import { DrawerContent, Box, DrawerFooter, Button } from '../design-system'
import ActionHeader from '../app/action-header'

type State = {
  record: RecordJSON;
  loading: boolean;
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
    this.handleSubmit = this.handleSubmit.bind(this)
    this.state = {
      record: {
        ...record,
        params: (record && record.params) || {},
        errors: (record && record.errors) || {},
        populated: (record && record.populated) || {},
      },
      loading: false,
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

    const formData = recordToFormData(record)

    this.setState({ loading: true })
    this.api.resourceAction({
      resourceId: resource.id,
      actionName: 'new',
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }).then((response) => {
      if (response.data.notice) {
        addNotice(response.data.notice)
      }
      if (response.data.redirectUrl) {
        history.push(appendForceRefresh(response.data.redirectUrl))
        this.setState({
          record: {
            params: {},
            errors: {},
            populated: {},
          } as RecordJSON,
          loading: false,
        })
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
        message: 'There was an error creating record, Check out console to see more information.',
        type: 'error',
      })
    })
    return false
  }

  render(): ReactNode {
    const { resource } = this.props
    const properties = resource.editProperties
    const { record, loading } = this.state
    return (
      <Box as="form" onSubmit={this.handleSubmit} flex flexGrow={1} flexDirection="column">
        <DrawerContent>
          <ActionHeader {...this.props} />
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
        </DrawerContent>
        <DrawerFooter>
          <Button variant="primary" size="lg">
            Save
          </Button>
        </DrawerFooter>
      </Box>
    )
  }
}

export default withNotice(withRouter(New))as unknown as ComponentClass<ActionProps>
