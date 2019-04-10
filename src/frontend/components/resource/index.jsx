import React from 'react'
import { connect } from "react-redux"

import ViewHelpers from '../../../backend/utils/view-helpers'
import Breadcrumbs from '../breadcrumbs'
import ActionBtn from './action-btn'
import RecordsTable from './records-table'
import Paginate from './paginate'
import Filter from '../filter'
import ApiClient from '../../utils/api-client'

class Resource extends React.PureComponent {
  constructor(props) {
    super(props)
    this.api = new ApiClient()
    this.resource = this.props.resources.find(r => r.id === this.props.match.params.resourceId)
    

    this.state = {
      loading: true,
      filterVisible: this.queryHasFilter(),
      records: [],
      page: 1,
      perPage: 20,
      total: 0,
      sortBy: this.resource.listProperties[0].name,
      direction: 'asc',
    }
  }

  queryHasFilter() {
    const query = new URLSearchParams(this.props.location.search)
    for (let key of query.keys()) {
      if (key.match('filters.')){ return true }
    }
    return false
  }

  _fetchData(resourceId) {
    this.resource = this.props.resources.find(r => r.id === resourceId)
    const query = new URLSearchParams(this.props.location.search)
    this.api.getRecords({
      resourceId: this.resource.id,
      query: query,
    }).then((response) => {
      this.setState({
        loading: false,
        records: response.data.records,
        page: response.data.meta.page,
        perPage: response.data.meta.perPage,
        total: response.data.meta.total,
        sortBy: response.data.meta.sortBy,
        direction: response.data.meta.direction,
      })
    })
  }

  componentDidMount() {
    this._fetchData(this.props.match.params.resourceId)
  }

  componentDidUpdate(prevProps) {
    if (this.props.match.params.resourceId !== prevProps.match.params.resourceId ||
       this.props.location.search !== prevProps.location.search) {
      this._fetchData(this.props.match.params.resourceId)
    }
  }

  renderActionBtn(action) {
    const h = new ViewHelpers()
    const actionWithHref = {
      href: h.resourceActionUrl(this.resource.id, action.name),
      ...action,
    }
    return (
      <ActionBtn action={actionWithHref} key={action.name} className="is-primary" />
    )
  }

  toggleFilter(event) {
    this.setState({ filterVisible: !this.state.filterVisible })
    event.preventDefault()
  }

  render() {
    return (
      <section className="table-list">
        <Breadcrumbs resource={this.resource}/>
        <div className="level">
          <div className="title">
            {this.resource.name}
          </div>
          <div className="toolbar">
            <div className="field is-grouped">
              {this.resource.resourceActions.map(action => this.renderActionBtn(action))}
              <div className="control">
                <a
                  className="button is-primary is-transparent filters-open"
                  onClick={this.toggleFilter.bind(this)}>
                  <span className="icon"><i className="fas fa-sliders-h"></i></span>
                  <span className="btn-text">Filter</span>
                </a>
              </div>
            </div>
          </div>
        </div>
        <div className="border-box">
          <RecordsTable
            sortBy={this.state.sortBy}
            direction={this.state.direction}
            resource={this.resource}
            records={this.state.records}
            paths={this.props.paths}
            />
          <Paginate
            page={this.state.page}
            perPage={this.state.perPage}
            total={this.state.total}
          />
        </div>
        <Filter
          resource={this.resource}
          search={this.state.search}
          isVisible={this.state.filterVisible}
          toggleFilter={this.toggleFilter.bind(this)}
        />
      </section>
    )
  }
}

const mapStateToProps = (state) => ({
  paths: state.paths,
  resources: state.resources,
})

export default connect(mapStateToProps)(Resource)
