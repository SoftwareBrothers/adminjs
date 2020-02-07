import React, { ReactNode, ComponentClass } from 'react'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'

import { Loader, Drawer } from '../design-system'
import BaseActionComponent from '../app/base-action-component'
import ApiClient from '../../utils/api-client'
import { RecordActionParams } from '../../../backend/utils/view-helpers'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError, NoRecordError } from '../app/error-message'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import shouldActionReFetchData from './utils/should-action-re-fetch-data'
import Wrapper from './utils/wrapper'
import { ActionHeader } from '../app'

interface State {
  record: RecordJSON | undefined;
  isLoading: boolean;
}

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = RouteComponentProps<RecordActionParams> & PropsFromState

class RecordAction extends React.Component<Props & AddNoticeProps, State> {
  constructor(props: Props & AddNoticeProps) {
    super(props)
    this.state = {
      record: undefined,
      isLoading: true,
    }
  }

  componentDidMount(): void {
    const { match } = this.props
    this.fetchRecord(match.params)
  }

  shouldComponentUpdate(newProps: Props): boolean {
    const { match } = this.props
    if (shouldActionReFetchData(match.params, newProps.match.params)) {
      this.fetchRecord(newProps.match.params)
      return false
    }
    return true
  }

  getResourceAndAction(name = null): {
    resource: ResourceJSON | undefined;
    action: ActionJSON | undefined;
  } {
    const { match, resources } = this.props
    const { resourceId, actionName } = match.params
    const { record } = this.state

    const nameToCheck = name || actionName

    const resource = resources.find(r => r.id === resourceId)
    const action = record && record.recordActions.find(r => r.name === nameToCheck)
    return {
      resource: resource || undefined,
      action: action || undefined,
    }
  }

  fetchRecord({ actionName, recordId, resourceId }: RecordActionParams): void {
    const { addNotice } = this.props
    const api = new ApiClient()
    this.setState({
      isLoading: true,
      record: undefined,
    })
    api.recordAction({
      resourceId,
      recordId,
      actionName,
    }).then((response) => {
      this.setState({
        isLoading: false,
        record: response.data.record,
      })
    }).catch((error) => {
      addNotice({
        message: [
          'There was an error fetching the record, ',
          'Check out console to see more information.',
        ].join('\n'),
        type: 'error',
      })
      throw error
    })
  }

  render(): ReactNode {
    const { match } = this.props
    const { actionName, recordId, resourceId } = match.params
    const { record, isLoading } = this.state

    const { resource, action } = this.getResourceAndAction()

    if (!resource) {
      return (<NoResourceError resourceId={resourceId} />)
    }
    if (!action && !isLoading) {
      return (<NoActionError resourceId={resourceId} actionName={actionName} />)
    }

    if (!record && !isLoading) {
      return (<NoRecordError resourceId={resourceId} recordId={recordId} />)
    }

    if (isLoading || !action) {
      return <Loader />
    }

    const ActionWrapper = (action.showInDrawer ? Drawer : Wrapper) as unknown as ComponentClass

    return (
      <ActionWrapper>
        {!action?.showInDrawer ? (
          <ActionHeader
            resource={resource}
            action={action}
            record={record}
          />
        ) : ''}
        <BaseActionComponent
          action={action as ActionJSON}
          resource={resource}
          record={record}
        />
      </ActionWrapper>
    )
  }
}


const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})


export default withNotice(connect(mapStateToProps)(RecordAction))
