import React from 'react'
import styled from 'styled-components'

import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import Label from '../../ui/label'
import ActionButton from '../action-button'
import getBulkActionsFromRecords from './utils/get-bulk-actions-from-records'

const SelectedRecordsWrapper = styled.section`
  position: absolute;
  top: -30px;
  padding-left: ${({ theme }): string => theme.sizes.padding};
`

type Props = {
  resource: ResourceJSON;
  selectedRecords: Array<RecordJSON>;
}

const InlineLabel = styled(Label)`
  &&& {
    display: inline;
    line-height: 36px;
  }
`

const SelectedRecords: React.FC<Props> = (props) => {
  const { resource, selectedRecords } = props

  const bulkActions = getBulkActionsFromRecords(selectedRecords)

  if (!selectedRecords.length) {
    return null
  }

  return (
    <SelectedRecordsWrapper>
      <InlineLabel>
        {`selected: ${selectedRecords.length}`}
      </InlineLabel>
      {bulkActions.map(action => (
        <ActionButton
          action={action}
          key={action.name}
          resourceId={resource.id}
          className="is-text"
          recordIds={selectedRecords.map(records => records.id)}
        />
      ))}
    </SelectedRecordsWrapper>
  )
}

export default SelectedRecords
