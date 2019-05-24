import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import RecordInList from './record-in-list'
import PropertyHeader from './property-header'
import ViewHelpers from '../../../backend/utils/view-helpers'
import { resourceType, pathsType, recordType } from '../../types'
import { sizes } from '../../styles/variables'

import Table from '../ui/table'

const TableWrapper = styled.div`
  position: relative;
  margin-bottom: 20px;
`

const TableScroller = styled.div`
  margin-left: ${sizes.mainColumn};
  overflow-x: scroll;
  overflow-y: visible;
  width: calc(100% - ${sizes.mainColumn});

  table {
    margin-bottom: 0;
  }
`

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
    <TableWrapper>
      <TableScroller>
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
      </TableScroller>
    </TableWrapper>
  )
}

RecordsTable.propTypes = {
  resource: resourceType.isRequired,
  paths: pathsType.isRequired,
  records: PropTypes.arrayOf(recordType).isRequired,
  actionPerformed: PropTypes.func.isRequired,
}

export default RecordsTable
