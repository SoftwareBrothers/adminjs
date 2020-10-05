import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Placeholder, TableRow, TableCell, CheckBox, ButtonGroup,
} from '@admin-bro/design-system'

import { useLocation } from 'react-router'
import PropertyType from '../../property-type'
import { ActionJSON, buildActionClickHandler, RecordJSON, ResourceJSON } from '../../../interfaces'
import { display } from './utils/display'
import { ActionResponse, RecordActionResponse } from '../../../../backend/actions/action.interface'
import mergeRecordResponse from '../../../hooks/use-record/merge-record-response'
import { useActionResponseHandler } from '../../../hooks'
import { actionsToButtonGroup } from '../action-header/actions-to-button-group'

export type RecordInListProps = {
  resource: ResourceJSON;
  record: RecordJSON;
  actionPerformed?: (action: ActionResponse) => any;
  isLoading?: boolean;
  onSelect?: (record: RecordJSON) => void;
  isSelected?: boolean;
}

export const RecordInList: React.FC<RecordInListProps> = (props) => {
  const {
    resource, record: recordFromProps, actionPerformed,
    isLoading, onSelect, isSelected,
  } = props
  const [record, setRecord] = useState<RecordJSON>(recordFromProps)
  const history = useHistory()
  const location = useLocation()

  const handleActionCallback = useCallback((actionResponse: ActionResponse) => {
    if (actionResponse.record && !actionResponse.redirectUrl) {
      setRecord(mergeRecordResponse(record, actionResponse as RecordActionResponse))
    } else if (actionPerformed) {
      actionPerformed(actionResponse)
    }
  }, [actionPerformed, record])

  const actionResponseHandler = useActionResponseHandler(handleActionCallback)

  useEffect(() => {
    setRecord(recordFromProps)
  }, [recordFromProps])

  const { recordActions } = record

  const show = record.recordActions.find(({ name }) => name === 'show')
  const edit = record.recordActions.find(({ name }) => name === 'edit')
  const action = show || edit

  const handleClick = (event): void => {
    if (action
      && event.targetTagName !== 'a'
      && event.targetTagName !== 'button'
      && event.targetTagName !== 'svg'
    ) {
      buildActionClickHandler({
        action,
        params: { resourceId: resource.id, recordId: record.id },
        actionResponseHandler,
        search: location.search,
        push: history.push,
      })(event)
    }
  }

  const actionParams = { resourceId: resource.id, recordId: record.id }

  const handleActionClick = (event, sourceAction: ActionJSON): void => (
    buildActionClickHandler({
      action: sourceAction,
      params: actionParams,
      actionResponseHandler,
      search: location.search,
      push: history.push,
    })(event)
  )

  const buttons = [{
    icon: 'OverflowMenuHorizontal',
    variant: 'light',
    label: null,
    buttons: actionsToButtonGroup({
      actions: recordActions,
      params: actionParams,
      search: location.search,
      handleClick: handleActionClick,
    }),
  }]


  return (
    <TableRow onClick={handleClick} data-id={record.id}>
      <TableCell className={isSelected ? 'selected' : 'not-selected'}>
        {onSelect && record.bulkActions.length ? (
          <CheckBox
            onChange={(): void => onSelect(record)}
            checked={isSelected}
          />
        ) : null}
      </TableCell>
      {resource.listProperties.map(property => (
        <TableCell
          style={{ cursor: 'pointer' }}
          key={property.name}
          data-property-name={property.name}
          display={display(property.isTitle)}
        >
          {isLoading ? (
            <Placeholder style={{ height: 14 }} />
          ) : (
            <PropertyType
              key={property.name}
              where="list"
              property={property}
              resource={resource}
              record={record}
            />
          )}
        </TableCell>
      ))}
      <TableCell key="options">
        {recordActions.length ? (
          <ButtonGroup buttons={buttons} />
        ) : ''}
      </TableCell>
    </TableRow>
  )
}

export default RecordInList
