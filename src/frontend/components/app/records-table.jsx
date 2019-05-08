import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import RecordInList from './record-in-list'
import PropertyHeader from './property-header'
import ViewHelpers from '../../../backend/utils/view-helpers'
import { resourceType, pathsType, recordType } from '../../types'

import Table from '../ui/table'

const RecordsTable = (props) => {
  const { resource, paths, records, actionPerformed } = props
  const h = new ViewHelpers()
  const newAction = h.resourceActionUrl({ resourceId: resource.id, actionName: 'new' })
  if (!records.length) {
    return (
      <div className="content has-text-centered">
        <h3>No records</h3>
        <p>
          There are no records in this resource.
          Create
          {' '}
          <Link to={newAction}>first record</Link>
        </p>
      </div>
    )
  }
  return (
    <Table>
      <thead>
        <tr key="header">
          {resource.listProperties.map(property => (
            <PropertyHeader resource={resource} property={property} key={property.name} />
          ))}
          <th key="actions" style={{ width: 80 }} />
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

RecordsTable.propTypes = {
  resource: resourceType.isRequired,
  paths: pathsType.isRequired,
  records: PropTypes.arrayOf(recordType).isRequired,
  actionPerformed: PropTypes.func.isRequired,
}

export default RecordsTable
