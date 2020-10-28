import React from 'react'
import { Table, TableBody, Loader } from '@admin-bro/design-system'

import RecordInList from './record-in-list'
import RecordsTableHeader from './records-table-header'
import NoRecords from './no-records'


import { RecordJSON, ResourceJSON } from '../../../interfaces'
import SelectedRecords from './selected-records'
import { ActionResponse } from '../../../../backend/actions/action.interface'

/**
 * @alias RecordsTableProps
 * @memberof RecordsTable
 */
export type RecordsTableProps = {
  /**
   * Resource which type records are rendered. Base on that we define which columns should be seen.
   */
  resource: ResourceJSON;
  /**
   * Array of records seen in the table
   */
  records: Array<RecordJSON>;
  /**
   * Handler function invoked when someone performs action without component on a given record.
   * Action without component is a `delete` action - you might want to refresh the list after that
   */
  actionPerformed?: (response: ActionResponse) => any;
  /** default sort by column */
  sortBy?: string;
  /** sort direction */
  direction?: 'asc' | 'desc';
  /** indicates if the table should be in loading state */
  isLoading?: boolean;
  /** list of selected records */
  selectedRecords?: Array<RecordJSON>;
  /** handler function triggered when record is selected */
  onSelect?: (record: RecordJSON) => any;
  /** handler function triggered when all items are selected */
  onSelectAll?: () => any;
}

/**
 * @classdesc
 * Renders an entire records table. To fill the data you might need:
 *
 * - {@link useRecords} and
 * - {@link useSelectedRecords} hooks
 *
 * so make sure to see at the documentation pages for both of them
 *
 * @component
 * @class
 * @hideconstructor
 * @subcategory Application
 * @new in version 3.3
 */
export const RecordsTable: React.FC<RecordsTableProps> = (props) => {
  const {
    resource, records,
    actionPerformed, sortBy,
    direction, isLoading,
    onSelect, selectedRecords,
    onSelectAll,
  } = props
  if (!records.length) {
    if (isLoading) {
      return (<Loader />)
    }
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
