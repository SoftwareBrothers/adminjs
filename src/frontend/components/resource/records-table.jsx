import React from 'react'
import { Link } from 'react-router-dom'
import RecordInList from './record-in-list'

export default class RecordsTable extends React.Component {
  renderPropertyHeader(property) {
    return (
      <th key={property.name}>
        <div className="text-small">
          {property.label}
        </div>
      </th>
    )
  }

  render() {
    const resource = this.props.resource
    const paths = this.props.paths
    const records = this.props.records
    console.log(records)
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