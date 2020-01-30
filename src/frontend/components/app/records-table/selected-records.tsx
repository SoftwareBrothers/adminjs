import React from 'react'

import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import ActionButton from '../action-button'
import getBulkActionsFromRecords from './utils/get-bulk-actions-from-records'
import { TableCaption, Button, Icon, Text } from '../../design-system'

type Props = {
  resource: ResourceJSON;
  selectedRecords?: Array<RecordJSON>;
}

const SelectedRecords: React.FC<Props> = (props) => {
  const { resource, selectedRecords } = props

  if (!selectedRecords || !selectedRecords.length) {
    return null
  }

  const bulkActions = getBulkActionsFromRecords(selectedRecords)

  return (
    <TableCaption>
      <Text as="span" mr="lg">{`Selected: (${selectedRecords.length})`}</Text>
      {bulkActions.map(action => (
        <ActionButton
          action={action}
          key={action.name}
          resourceId={resource.id}
          recordIds={selectedRecords.map(records => records.id)}
        >
          <Button variant="text" size="sm">
            <Icon icon={action.icon} />
            {action.label}
          </Button>
        </ActionButton>
      ))}
    </TableCaption>
  )
}

export default SelectedRecords
