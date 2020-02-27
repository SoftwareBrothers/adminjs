import React from 'react'

import RecordInList from './record-in-list'
import RecordsTableHeader from './records-table-header'
import NoRecords from './no-records'

import { Table, TableBody } from '../../design-system'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import SelectedRecords from './selected-records'

export type Props = {
  resource: ResourceJSON;
  records: Array<RecordJSON>;
  actionPerformed?: (actionName: string) => any;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  isLoading?: boolean;
  selectedRecords?: Array<RecordJSON>;
  onSelect?: (record: RecordJSON) => any;
  onSelectAll?: () => any;
}

const RecordsTable: React.FC<Props> = (props) => {
  const {
    resource, records,
    actionPerformed, sortBy,
    direction, isLoading,
    onSelect, selectedRecords,
    onSelectAll,
  } = props
  if (!records.length) {
    return (<NoRecords resource={resource} />)
  }

  const selectedAll = selectedRecords && !!records.find(record => (
    selectedRecords.find(selected => selected.id === record.id)
  ))

  const recordsHaveBulkAction = !!records.find(record => record.bulkActions.length)

  return (
    <Table>
      <SelectedRecords
        resource={resource}
        selectedRecords={selectedRecords}
      />
      <RecordsTableHeader
        properties={resource.listProperties}
        titleProperty={resource.titleProperty}
        direction={direction}
        sortBy={sortBy}
        onSelectAll={recordsHaveBulkAction ? onSelectAll : undefined}
        selectedAll={selectedAll}
      />
      <TableBody>
        {records.map(record => (
          <RecordInList
            record={record}
            resource={resource}
            key={record.id}
            actionPerformed={actionPerformed}
            isLoading={isLoading}
            onSelect={onSelect}
            isSelected={
              selectedRecords && !!selectedRecords.find(selected => selected.id === record.id)
            }
          />
        ))}
      </TableBody>
    </Table>
  )
}

export default RecordsTable
