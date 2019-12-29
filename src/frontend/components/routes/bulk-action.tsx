import React, { ReactNode } from 'react'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import Breadcrumbs from '../app/breadcrumbs'
import ActionHeader from '../app/action-header'
import WrapperBox from '../ui/wrapper-box'
import Notice from '../app/notice'
import BaseAction from '../app/base-action-component'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError, ErrorMessageBox } from '../ui/error404'
import NoticeWrapper from './styled/notice-wrapper.styled'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { Loader } from '../ui'
import shouldActionReFetchData from './utils/should-action-re-fetch-data'
import { BulkActionParams } from '../../../backend/utils/view-helpers'
import ApiClient from '../../utils/api-client'
import withNotice, { AddNoticeProps, NoticeMessage } from '../../store/with-notice'
import getBulkActionsFromRecords from '../app/records-table/utils/get-bulk-actions-from-records'
import ActionJSON from '../../../backend/decorators/action-json.interface'

const NO_RECORDS_ERROR: NoticeMessage = {
  message: 'There was an error fething records, Check out console to see more information.',
  type: 'error',
}

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type MatchParams = Pick<BulkActionParams, 'actionName' | 'resourceId'>
type Props = PropsFromState & RouteComponentProps<MatchParams> & AddNoticeProps

type State = {
  records?: Array<RecordJSON>;
  isLoading: boolean;
  tag?: string;
}

class BulkAction extends React.Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      records: undefined,
      isLoading: true,
      tag: undefined,
    }
  }

  componentDidMount(): void {
    const { match } = this.props
    this.fetchRecords(match.params)
  }

  shouldComponentUpdate(newProps: Props): boolean {
    const { match } = this.props
    if (shouldActionReFetchData(match.params, newProps.match.params)) {
      this.fetchRecords(newProps.match.params)
      return false
    }
    return true
  }

  setTag(tagName): void {
    this.setState({ tag: tagName })
  }

  fetchRecords({ resourceId, actionName }: MatchParams): Promise<void> {
    const { addNotice, location } = this.props
    const recordIdsString = new URLSearchParams(location.search).get('recordIds')
    const recordIds = recordIdsString ? recordIdsString.split(',') : []

    const api = new ApiClient()
    this.setState({
      isLoading: true,
      records: undefined,
    })
    return api.bulkAction({
      resourceId, recordIds, actionName,
    }).then((response) => {
      this.setState({ isLoading: false, records: response.data.records })
    }).catch((error) => {
      addNotice(NO_RECORDS_ERROR)
      throw error
    })
  }

  render(): ReactNode {
    const { resources, match } = this.props
    const { resourceId, actionName } = match.params
    const { isLoading, tag, records } = this.state

    const resource = resources.find(r => r.id === resourceId)

    if (!resource) {
      return (<NoResourceError resourceId={resourceId} />)
    }

    if (!records && !isLoading) {
      return (
        <ErrorMessageBox title="No records">
          <p>You have not selected any records</p>
        </ErrorMessageBox>
      )
    }

    const action = getBulkActionsFromRecords(records || []).find(r => r.name === actionName)

    if (!action && !isLoading) {
      return (<NoActionError resourceId={resourceId} actionName={actionName} />)
    }

    return (
      <div>
        <NoticeWrapper>
          <Notice />
        </NoticeWrapper>
        <WrapperBox>
          <Breadcrumbs resource={resource} actionName={actionName} />
          <ActionHeader
            resource={resource}
            action={action}
            tag={tag}
          />
          {isLoading
            ? <Loader />
            : (
              <BaseAction
                action={action as ActionJSON}
                resource={resource}
                records={records}
                setTag={this.setTag}
              />
            )
          }
        </WrapperBox>
      </div>
    )
  }
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default withNotice(connect(mapStateToProps)(BulkAction))
