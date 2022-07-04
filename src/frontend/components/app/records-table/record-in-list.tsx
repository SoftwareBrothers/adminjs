import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Placeholder, TableRow, TableCell, CheckBox, ButtonGroup,
} from '@adminjs/design-system'

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
    const targetTagName = (event.target as HTMLElement).tagName.toLowerCase()
    if (action
      && targetTagName !== 'a'
      && targetTagName !== 'button'
      && targetTagName !== 'svg'
    ) {
      buildActionClickHandler({
        action,
        params: { resourceId: resource.id, recordId: record.id },
        actionResponseHandler,
        push: history.push,
      })(event)
    }
  }

  const actionParams = { resourceId: resource.id, recordId: record.id }

  const handleActionClick = (event, sourceAction: ActionJSON): void | Promise<void> => (
    buildActionClickHandler({
      action: sourceAction,
      params: actionParams,
      actionResponseHandler,
      push: history.push,
    })(event)
  )

  const buttons = [{
    icon: 'OverflowMenuHorizontal',
    variant: 'light' as const,
    label: undefined,
    'data-testid': 'actions-dropdown',
    buttons: actionsToButtonGroup({
      actions: recordActions,
      params: actionParams,
      handleClick: handleActionClick,
    }),
  }]


  return (
    <TableRow onClick={handleClick} data-id={record.id}>
      <TableCell className={isSelected ? 'selected' : 'not-selected'}>
        {onSelect && record.bulkActions.length ? (
          <CheckBox
            onChange={() => onSelect(record)}
            checked={isSelected}
          />
        ) : null}
      </TableCell>
      {resource.listProperties.map(property => (
        <TableCell
          style={{ cursor: 'pointer' }}
          key={property.propertyPath}
          data-property-name={property.propertyPath}
          display={display(property.isTitle)}
        >
          {isLoading ? (
            <Placeholder style={{ height: 14 }} />
          ) : (
            <PropertyType
              key={property.propertyPath}
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
