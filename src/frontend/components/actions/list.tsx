import React, { ReactNode } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import ApiClient from '../../utils/api-client'
import WrapperBox from '../ui/wrapper-box'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import RecordsTable from '../app/records-table'
import Paginate from '../ui/paginate'
import { ActionProps } from './action.props'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { ListActionResponse } from '../../../backend/actions/list-action'
import { NoticeType } from '../../store/store'

type State = {
  records: Array<RecordJSON>;
  page: number;
  perPage: number;
  total: number;
  loading: boolean;
  direction: 'asc' | 'desc';
  sortBy?: string;
}

// TODO: add direction enum

/**
 * @name NewAction
 * @category Actions
 * @description Shows form for creating a given record.
 * @component
 * @private
 */
class List extends React.Component<ActionProps & RouteComponentProps & AddNoticeProps, State> {
  private api: ApiClient

  constructor(props) {
    super(props)
    this.api = new ApiClient()
    this.handleActionPerformed = this.handleActionPerformed.bind(this)
    this.state = {
      records: [],
      page: 1,
      perPage: 20,
      total: 0,
      loading: true,
      direction: 'asc',
      sortBy: undefined,
    }
  }

  componentDidMount(): void {
    this._fetchData()
  }

  componentDidUpdate(prevProps): void {
    const { resource, location } = this.props

    if (resource.id !== prevProps.resource.id
       || location.search !== prevProps.location.search) {
      this._fetchData()
    }
  }

  componentWillUnmount(): void {
    const { setTag } = this.props
    if (setTag) {
      setTag('')
    }
  }

  _fetchData(): void {
    const { location, resource, setTag, addNotice } = this.props
    const api = new ApiClient()
    this.setState({ loading: true })
    const query = new URLSearchParams(location.search)
    api.resourceAction({
      actionName: 'list',
      resourceId: resource.id,
      params: query,
    }).then((response: {data: ListActionResponse}) => {
      this.setState({
        records: response.data.records,
        page: response.data.meta.page,
        perPage: response.data.meta.perPage,
        total: response.data.meta.total,
        direction: response.data.meta.direction,
        sortBy: response.data.meta.sortBy,
        loading: false,
      })
      if (setTag) {
        if (typeof response.data.meta.total === 'undefined') {
          setTag('')
        } else {
          setTag(response.data.meta.total.toString())
        }
      }
    }).catch(() => {
      addNotice({
        message: 'There was an error fething records, Check out console to see more information.',
        type: NoticeType.error,
      })
    })
  }

  handleActionPerformed(): void {
    this._fetchData()
  }

  render(): ReactNode {
    const { resource } = this.props
    const {
      records, page, perPage, total,
      loading, direction, sortBy,
    } = this.state
    return (
      <WrapperBox border>
        <RecordsTable
          resource={resource}
          records={records}
          actionPerformed={this.handleActionPerformed}
          direction={direction}
          sortBy={sortBy}
          isLoading={loading}
        />
        <Paginate
          page={page}
          perPage={perPage}
          total={total}
        />
      </WrapperBox>
    )
  }
}

export default withNotice(withRouter(List))
