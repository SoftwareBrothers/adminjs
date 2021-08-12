import React from 'react'
import { TableCaption, Title, ButtonGroup, Box } from '@adminjs/design-system'

import { useHistory } from 'react-router'
import { ActionJSON, buildActionClickHandler, RecordJSON, ResourceJSON } from '../../../interfaces'
import getBulkActionsFromRecords from './utils/get-bulk-actions-from-records'
import { useActionResponseHandler, useTranslation } from '../../../hooks'
import { actionsToButtonGroup } from '../action-header/actions-to-button-group'

type SelectedRecordsProps = {
  resource: ResourceJSON;
  selectedRecords?: Array<RecordJSON>;
}

export const SelectedRecords: React.FC<SelectedRecordsProps> = (props) => {
  const { resource, selectedRecords } = props
  const { translateLabel } = useTranslation()
  const history = useHistory()
  const actionResponseHandler = useActionResponseHandler()

  if (!selectedRecords || !selectedRecords.length) {
    return null
  }

  const params = { resourceId: resource.id, recordIds: selectedRecords.map(records => records.id) }

  const handleActionClick = (event, sourceAction: ActionJSON): void => (
    buildActionClickHandler({
      action: sourceAction,
      params,
      actionResponseHandler,
      push: history.push,
    })(event)
  )

  const bulkButtons = actionsToButtonGroup({
    actions: getBulkActionsFromRecords(selectedRecords),
    params,
    handleClick: handleActionClick,
  })

  return (
    <TableCaption>
      <Box flex py="sm" alignItems="center">
        <Title mr="lg">
          {translateLabel('selectedRecords', resource.id, { selected: selectedRecords.length })}
        </Title>
        <ButtonGroup size="sm" rounded buttons={bulkButtons} />
      </Box>
    </TableCaption>
  )
}

export default SelectedRecords
