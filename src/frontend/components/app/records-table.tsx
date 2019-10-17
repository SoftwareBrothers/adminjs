import React from 'react'

import RecordInList from './record-in-list'
import RecordsTableHeader from './records-table-header'
import NoRecords from './no-records'

import Table from '../ui/table'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

type Props = {
  resource: ResourceJSON;
  records: Array<RecordJSON>;
  actionPerformed?: (actionName: string) => any;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  isLoading: boolean;
}

const RecordsTable: React.FC<Props> = (props) => {
  const { resource, records, actionPerformed, sortBy, direction, isLoading } = props
  if (!records.length) {
    return (<NoRecords resource={resource} />)
  }
  return (
    <Table>
      <RecordsTableHeader
        properties={resource.listProperties}
        titleProperty={resource.titleProperty}
        direction={direction}
        sortBy={sortBy}
      />
      <tbody>
        {records.map(record => (
          <RecordInList
            record={record}
            resource={resource}
            key={record.id}
            actionPerformed={actionPerformed}
            isLoading={isLoading}
          />
        ))}
      </tbody>
    </Table>
  )
}

export default RecordsTable
