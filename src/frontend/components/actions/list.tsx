import React, { ReactNode } from 'react'
import { withRouter } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import ApiClient from '../../utils/api-client'
import WrapperBox from '../ui/wrapper-box'
import withNotice, { AddNoticeProps } from '../../store/with-notice'
import RecordsTable from '../app/records-table/records-table'
import Paginate from '../ui/paginate'
import { ActionProps } from './action.props'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { ListActionResponse } from '../../../backend/actions/list-action'

type State = {
  records: Array<RecordJSON>;
  page: number;
  perPage: number;
  total: number;
  loading: boolean;
  direction: 'asc' | 'desc';
  sortBy?: string;
  selectedRecords: Array<RecordJSON>;
}

type Props = ActionProps & RouteComponentProps & AddNoticeProps

// TODO: add direction enum

/**
 * @name NewAction
 * @category Actions
 * @description Shows form for creating a given record.
 * @component
 * @private
 */
class List extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    this.handleActionPerformed = this.handleActionPerformed.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSelectAll = this.handleSelectAll.bind(this)
    this.state = {
      records: [],
      page: 1,
      perPage: 20,
      total: 0,
      loading: true,
      direction: 'asc',
      sortBy: undefined,
      selectedRecords: [],
    }
  }

  componentDidMount(): void {
    this._fetchData(this.props)
  }

  shouldComponentUpdate(newProps): boolean {
    const { resource, location } = this.props

    if (resource.id !== newProps.resource.id
       || location.search !== newProps.location.search) {
      this._fetchData(newProps)
      return false
    }
    return true
  }

  componentWillUnmount(): void {
    const { setTag } = this.props
    if (setTag) {
      setTag('')
    }
  }

  _fetchData(props: Props): void {
    const { location, resource, setTag, addNotice } = props
    const { resource: oldResource } = this.props
    const { selectedRecords } = this.state

    const api = new ApiClient()
    this.setState({ loading: true })
    const query = new URLSearchParams(location.search)
    api.resourceAction({
      actionName: 'list',
      resourceId: resource.id,
      params: query,
    }).then((response) => {
      const listActionReponse = response.data as ListActionResponse
      this.setState({
        records: listActionReponse.records,
        page: listActionReponse.meta.page,
        perPage: listActionReponse.meta.perPage,
        total: listActionReponse.meta.total,
        direction: listActionReponse.meta.direction,
        sortBy: listActionReponse.meta.sortBy,
        selectedRecords: oldResource.id === resource.id ? selectedRecords : [],
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
        type: 'error',
      })
    })
  }

  handleActionPerformed(): void {
    this._fetchData(this.props)
  }

  handleSelect(record: RecordJSON): void {
    const { selectedRecords } = this.state
    const selectedIndex = selectedRecords.findIndex(selected => selected.id === record.id)
    if (selectedIndex < 0) {
      this.setState({ selectedRecords: [...selectedRecords, record] })
    } else {
      const newSelectedRecords = [...selectedRecords]
      newSelectedRecords.splice(selectedIndex, 1)
      this.setState({ selectedRecords: newSelectedRecords })
    }
  }

  handleSelectAll(): void {
    const { records, selectedRecords } = this.state

    const missing = records.filter(record => (
      !selectedRecords.find(selected => selected.id === record.id)
      && record.bulkActions.length
    ))
    if (missing.length) {
      this.setState({ selectedRecords: [...selectedRecords, ...missing] })
    } else {
      const newSelectedRecords = selectedRecords.filter(selected => (
        !records.find(record => record.id === selected.id)
      ))
      this.setState({ selectedRecords: newSelectedRecords })
    }
  }

  render(): ReactNode {
    const { resource } = this.props
    const {
      records, page, perPage, total,
      loading, direction, sortBy, selectedRecords,
    } = this.state
    return (
      <WrapperBox border>
        <RecordsTable
          resource={resource}
          records={records}
          actionPerformed={this.handleActionPerformed}
          onSelect={this.handleSelect}
          onSelectAll={this.handleSelectAll}
          selectedRecords={selectedRecords}
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
