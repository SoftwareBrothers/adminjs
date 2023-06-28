import { Loader, Table, TableBody } from '@adminjs/design-system'
import React from 'react'

import { ActionResponse } from '../../../../backend/actions/action.interface.js'
import allowOverride from '../../../hoc/allow-override.js'
import { RecordJSON, ResourceJSON } from '../../../interfaces/index.js'
import { getResourceElementCss } from '../../../utils/index.js'
import NoRecords from './no-records.js'
import RecordInList from './record-in-list.js'
import RecordsTableHeader from './records-table-header.js'
import SelectedRecords from './selected-records.js'

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
 */
const RecordsTable: React.FC<RecordsTableProps> = (props) => {
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

  const selectedAll = selectedRecords && !!records.find((record) => (
    selectedRecords.find((selected) => selected.id === record.id)
  ))

  const recordsHaveBulkAction = !!records.find((record) => record.bulkActions.length)

  const contentTag = getResourceElementCss(resource.id, 'table')
  const selectedTag = getResourceElementCss(resource.id, 'table-selected-records')
  const bodyTag = getResourceElementCss(resource.id, 'table-body')

  return (
    <Table data-css={contentTag}>
      <SelectedRecords
        resource={resource}
        selectedRecords={selectedRecords}
        data-css={selectedTag}
      />
      <RecordsTableHeader
        properties={resource.listProperties}
        titleProperty={resource.titleProperty}
        direction={direction}
        sortBy={sortBy}
        onSelectAll={recordsHaveBulkAction ? onSelectAll : undefined}
        selectedAll={selectedAll}
      />
      <TableBody data-css={bodyTag}>
        {records.map((record) => (
          <RecordInList
            record={record}
            resource={resource}
            key={record.id}
            actionPerformed={actionPerformed}
            isLoading={isLoading}
            onSelect={onSelect}
            isSelected={
              selectedRecords && !!selectedRecords.find((selected) => selected.id === record.id)
            }
          />
        ))}
      </TableBody>
    </Table>
  )
}

const OverridableRecordsTable = allowOverride(RecordsTable, 'RecordsTable')

export {
  OverridableRecordsTable as default,
  OverridableRecordsTable as RecordsTable,
  RecordsTable as OriginalRecordsTable,
}
