import React from 'react'
import styled from 'styled-components'

import RecordInList from './record-in-list'
import PropertyHeader from './property-header'

const Table = styled.table.attrs({
  className: 'table is-fullwidth',
})`
  & > thead > tr > th {
    border: none;

    &.actions {
      width: 80px;
    }
  }

`

const RecordsTable = (props) => {
  const { resource, paths, records, actionPerformed } = props
  return (
    <Table>
      <thead>
        <tr key="header">
          {resource.listProperties.map(property => (
            <PropertyHeader resource={resource} property={property} key={property.name} />
          ))}
          <th key="actions" className="actions" />
        </tr>
      </thead>
      <tbody>
        {records.map(record => (
          <RecordInList
            record={record}
            resource={resource}
            paths={paths}
            key={record.id}
            actionPerformed={actionPerformed}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default RecordsTable
