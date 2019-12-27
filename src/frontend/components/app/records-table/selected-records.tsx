import React from 'react'
import styled from 'styled-components'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import Label from '../../ui/label'
import ActionButton from '../action-button'

const SelectedRecordsWrapper = styled.section`
  position: absolute;
  top: -20px;
  padding-left: ${({ theme }): string => theme.sizes.padding};
`

type Props = {
  resource: ResourceJSON;
  selectedRecords: Array<RecordJSON>;
}


const SelectedRecords: React.FC<Props> = (props) => {
  const { resource, selectedRecords } = props
  const { bulkActions } = resource

  if (!selectedRecords.length) {
    return null
  }

  return (
    <SelectedRecordsWrapper>
      <Label>
        {`selected: ${selectedRecords.length}`}
      </Label>
      {bulkActions.map(action => (
        <ActionButton
          action={action}
          key={action.name}
          resourceId={resource.id}
          recordIds={selectedRecords.map(records => records.id)}
        />
      ))}
    </SelectedRecordsWrapper>
  )
}

export default SelectedRecords
