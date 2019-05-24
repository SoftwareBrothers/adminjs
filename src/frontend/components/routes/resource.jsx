import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import styled from 'styled-components'

import Breadcrumbs from '../app/breadcrumbs'
import RecordsTable from '../app/records-table'
import Paginate from '../ui/paginate'
import Filter from '../app/filter'
import ActionHeader from '../app/action-header'
import WrapperBox from '../ui/wrapper-box'
import Notice from '../app/notice'

import ApiClient from '../../utils/api-client'
import queryHasFilter from '../../utils/query-has-filter'
import { locationType, resourceType, matchType, pathsType } from '../../types'

const Wrapper = styled.section.attrs({
  className: 'level',
})`
  align-items: stretch;
  flex-grow: 1;
  flex-direction: column;
`

const NoticeWrapper = styled.div`
  width: 100%;
  position: relative;
`

class Resource extends React.Component {
  constructor(props) {
    super(props)
    const { location } = props
    this.toggleFilter = this.toggleFilter.bind(this)
    this.handleActionPerformed = this.handleActionPerformed.bind(this)
    this.resource = this.currentResource()

    this.state = {
      filterVisible: queryHasFilter(location.search),
      records: [],
      page: 1,
      perPage: 20,
      total: 0,
    }
  }

  componentDidMount() {
    const { match } = this.props
    this._fetchData(match.params.resourceId)
  }

  componentDidUpdate(prevProps) {
    const { match, location } = this.props

    if (match.params.resourceId !== prevProps.match.params.resourceId
       || location.search !== prevProps.location.search) {
      this._fetchData(match.params.resourceId)
    }
  }

  currentResource(resourceId) {
    const { resources, match } = this.props
    return resources.find(r => (
      r.id === (resourceId || match.params.resourceId)
    ))
  }

  _fetchData(resourceId) {
    const { location } = this.props
    const api = new ApiClient()
    this.resource = this.currentResource(resourceId)
    const query = new URLSearchParams(location.search)
    api.getRecords({
      resourceId: this.resource.id,
      query,
    }).then((response) => {
      this.setState({
        records: response.data.records,
        page: response.data.meta.page,
        perPage: response.data.meta.perPage,
        total: response.data.meta.total,
      })
    })
  }

  handleActionPerformed() {
    const { match } = this.props
    this._fetchData(match.params.resourceId)
  }

  toggleFilter(event) {
    this.setState(state => ({ filterVisible: !state.filterVisible }))
    event.preventDefault()
  }

  render() {
    const resource = this.currentResource()
    const { paths } = this.props
    const { records, page, perPage, total, search, filterVisible } = this.state
    return (
      <Wrapper>
        <NoticeWrapper>
          <Notice />
        </NoticeWrapper>
        <WrapperBox>
          <Breadcrumbs resource={resource} />
          <ActionHeader
            resource={resource}
            tag={total}
            toggleFilter={this.toggleFilter}
            actionPerformed={this.handleActionPerformed}
          />
          <WrapperBox border>
            <RecordsTable
              resource={this.resource}
              records={records}
              paths={paths}
              actionPerformed={this.handleActionPerformed}
            />
            <Paginate
              page={page}
              perPage={perPage}
              total={total}
            />
          </WrapperBox>
        </WrapperBox>
        <Filter
          resource={this.resource}
          search={search}
          isVisible={filterVisible}
          toggleFilter={this.toggleFilter}
        />
      </Wrapper>
    )
  }
}

const mapStateToProps = state => ({
  paths: state.paths,
  resources: state.resources,
})

Resource.propTypes = {
  resources: PropTypes.arrayOf(resourceType).isRequired,
  location: locationType.isRequired,
  match: matchType.isRequired,
  paths: pathsType.isRequired,
}

export default connect(mapStateToProps)(Resource)
