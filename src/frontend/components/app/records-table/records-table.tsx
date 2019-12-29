import React from 'react'
import styled from 'styled-components'

import RecordInList from './record-in-list'
import RecordsTableHeader from './records-table-header'
import NoRecords from './no-records'

import Table from '../../ui/table'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import SelectedRecords from './selected-records'

const RecordsTableWrapper = styled.section`
  position: relative;
`

type Props = {
  resource: ResourceJSON;
  records: Array<RecordJSON>;
  actionPerformed?: (actionName: string) => any;
  sortBy?: string;
  direction?: 'asc' | 'desc';
  isLoading: boolean;
  selectedRecords: Array<RecordJSON>;
  onSelect: (record: RecordJSON) => any;
  onSelectAll: () => any;
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

  const selectedAll = !!records.find(record => (
    selectedRecords.find(selected => selected.id === record.id)
  ))

  return (
    <RecordsTableWrapper>
      <SelectedRecords
        resource={resource}
        selectedRecords={selectedRecords}
      />
      <Table>
        <RecordsTableHeader
          properties={resource.listProperties}
          titleProperty={resource.titleProperty}
          direction={direction}
          sortBy={sortBy}
          onSelectAll={onSelectAll}
          selectedAll={selectedAll}
        />
        <tbody>
          {records.map(record => (
            <RecordInList
              record={record}
              resource={resource}
              key={record.id}
              actionPerformed={actionPerformed}
              isLoading={isLoading}
              onSelect={onSelect}
              isSelected={!!selectedRecords.find(selected => selected.id === record.id)}
            />
          ))}
        </tbody>
      </Table>
    </RecordsTableWrapper>
  )
}

export default RecordsTable
