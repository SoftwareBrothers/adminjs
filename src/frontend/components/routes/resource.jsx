import React from 'react'
import { connect } from 'react-redux'

import {
  Breadcrumbs, RecordsTable, Paginate, Filter, ActionHeader, BorderBox, ActionWrapper,
} from '../layout'

import { sizes } from '../../styles/variables'
import ApiClient from '../../utils/api-client'
import queryHasFilter from './query-has-filter'

class Resource extends React.Component {
  constructor(props) {
    super(props)
    this.resource = this.currentResource()

    this.state = {
      loading: true,
      filterVisible: queryHasFilter(this.props.location.search),
      records: [],
      page: 1,
      perPage: 20,
      total: 0,
    }
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.resourceId !== prevProps.match.params.resourceId ||
       this.props.location.search !== prevProps.location.search) {
      this._fetchData(this.props.match.params.resourceId)
    }
  }

  currentResource(resourceId) {
    const { resources } = this.props
    return resources.find(r => (
      r.id === (resourceId || this.props.match.params.resourceId)
    ))
  }

  _fetchData(resourceId) {
    const api = new ApiClient()
    this.resource = this.currentResource(resourceId)
    const query = new URLSearchParams(this.props.location.search)
    api.getRecords({
      resourceId: this.resource.id,
      query,
    }).then((response) => {
      this.setState({
        loading: false,
        records: response.data.records,
        page: response.data.meta.page,
        perPage: response.data.meta.perPage,
        total: response.data.meta.total,
      })
    })
  }

  componentDidMount() {
    this._fetchData(this.props.match.params.resourceId)
  }

  handleActionPerformed() {
    this._fetchData(this.props.match.params.resourceId)
  }

  toggleFilter(event) {
    this.setState({ filterVisible: !this.state.filterVisible })
    event.preventDefault()
  }

  render() {
    const resource = this.currentResource()
    return (
      <ActionWrapper>
        <Breadcrumbs resource={resource} />
        <ActionHeader
          resource={resource}
          toggleFilter={this.toggleFilter.bind(this)}
          actionPerformed={this.handleActionPerformed.bind(this)}
        />
        <BorderBox>
          <RecordsTable
            resource={this.resource}
            records={this.state.records}
            paths={this.props.paths}
            actionPerformed={this.handleActionPerformed.bind(this)}
          />
          <Paginate
            page={this.state.page}
            perPage={this.state.perPage}
            total={this.state.total}
          />
        </BorderBox>
      </ActionWrapper>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  resources: state.resources,
})

export default connect(mapStateToProps)(Resource)



        
        // <div className="border-box">
        
        // </div>
        // <Filter
        //   resource={this.resource}
        //   search={this.state.search}
        //   isVisible={this.state.filterVisible}
        //   toggleFilter={this.toggleFilter.bind(this)}
        // />