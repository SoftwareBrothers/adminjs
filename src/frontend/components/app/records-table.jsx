import React from 'react'
import PropTypes from 'prop-types'

import RecordInList from './record-in-list'
import PropertyHeader from './property-header'
import NoRecords from './no-records'
import { resourceType, recordType } from '../../types'

import Table from '../ui/table'

const RecordsTable = (props) => {
  const { resource, records, actionPerformed, sortBy, direction } = props
  if (!records.length) {
    return (<NoRecords resource={resource} />)
  }
  return (
    <Table>
      <thead>
        <tr key="header">
          {resource.listProperties.map(property => (
            <PropertyHeader
              resource={resource}
              property={property}
              key={property.name}
              sortBy={sortBy}
              direction={direction}
            />
          ))}
          <th key="actions" style={{ width: 80 }} />
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <RecordInList
            record={record}
            resource={resource}
            key={record.id}
            actionPerformed={actionPerformed}
          />
        ))}
      </tbody>
    </Table>
  )
}

RecordsTable.propTypes = {
  resource: resourceType.isRequired,
  records: PropTypes.arrayOf(recordType).isRequired,
  actionPerformed: PropTypes.func.isRequired,
  sortBy: PropTypes.string.isRequired,
  direction: PropTypes.string.isRequired,
}

export default RecordsTable
