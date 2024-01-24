import React from 'react'
import { TableCaption, Title, ButtonGroup, Box } from '@adminjs/design-system'
import { useNavigate, useLocation } from 'react-router'

import { ActionJSON, buildActionClickHandler, RecordJSON, ResourceJSON } from '../../../interfaces/index.js'
import getBulkActionsFromRecords from './utils/get-bulk-actions-from-records.js'
import { useActionResponseHandler, useTranslation, useModal } from '../../../hooks/index.js'
import { actionsToButtonGroup } from '../action-header/actions-to-button-group.js'
import allowOverride from '../../../hoc/allow-override.js'
import { getResourceElementCss } from '../../../utils/index.js'

type SelectedRecordsProps = {
  resource: ResourceJSON;
  selectedRecords?: Array<RecordJSON>;
}

const SelectedRecords: React.FC<SelectedRecordsProps> = (props) => {
  const { resource, selectedRecords } = props
  const translateFunctions = useTranslation()
  const { translateLabel } = translateFunctions
  const navigate = useNavigate()
  const location = useLocation()
  const actionResponseHandler = useActionResponseHandler()
  const modalFunctions = useModal()

  if (!selectedRecords || !selectedRecords.length) {
    return null
  }

  const params = {
    resourceId: resource.id,
    recordIds: selectedRecords.map((records) => records.id),
  }

  const handleActionClick = (event, sourceAction: ActionJSON): void => (
    buildActionClickHandler({
      action: sourceAction,
      params,
      actionResponseHandler,
      navigate,
      location,
      translateFunctions,
      modalFunctions,
    })(event)
  )

  const bulkButtons = actionsToButtonGroup({
    actions: getBulkActionsFromRecords(selectedRecords),
    params,
    handleClick: handleActionClick,
    translateFunctions,
    modalFunctions,
  })

  const contentTag = getResourceElementCss(resource.id, 'table-caption')

  return (
    <TableCaption data-css={contentTag}>
      <Box flex py="sm" alignItems="center">
        <Title mr="lg">
          {translateLabel('selectedRecords', resource.id, { selected: selectedRecords.length })}
        </Title>
        <ButtonGroup size="sm" rounded buttons={bulkButtons} />
      </Box>
    </TableCaption>
  )
}

const OverridableSelectedRecords = allowOverride(SelectedRecords, 'SelectedRecords')

export {
  OverridableSelectedRecords as default,
  OverridableSelectedRecords as SelectedRecords,
  SelectedRecords as OriginalSelectedRecords,
}
