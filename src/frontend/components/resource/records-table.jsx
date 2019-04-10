import React from 'react'
import { Link } from 'react-router-dom'
import RecordInList from './record-in-list'

export default class RecordsTable extends React.Component {
  renderPropertyHeader(property) {
    const isMain = property.name === this.props.resource.titleProperty.name
    const isSortedBy = property.name === this.props.sortBy

    let direction = 'asc' 
    if (isSortedBy && this.props.direction === 'asc') {
      direction = 'desc'
    }
    const search = new URLSearchParams(`sortBy=${property.name}&direction=${direction}`)

    const sortedByClass = `icomoon-dropdown-${this.props.direction === 'asc' ? 'open' : 'close'}`
    const indicator = (
      <span className="sorting-icons">
        <i className={sortedByClass}></i>
      </span>
    )
    const link = (
      <Link to={{search: search.toString()}} className="is-sortable text-small">
        {property.label}
        {isSortedBy && indicator}
      </Link>
    )
    return (
      <th key={property.name} className={isMain ? 'main' : ''}>
        <div className="text-small">
          {property.isSortable ? link : property.label}
        </div>
      </th>
    )
  }

  render() {
    const resource = this.props.resource
    const paths = this.props.paths
    const records = this.props.records
    return (
      <table className="table is-fullwidth">
        <thead>
          <tr key="header">
            {resource.listProperties.map(property => this.renderPropertyHeader(property))}
            <th kay='actions'></th>
          </tr>
        </thead>
        <tbody>
          {records.map(record => (
            <RecordInList record={record}
                          resource={resource}
                          paths={paths}
                          key={record.id}
                          />
          ))}
        </tbody>
      </table>
    )
  }
}