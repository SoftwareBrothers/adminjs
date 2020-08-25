import React, { useState, useEffect, useCallback } from 'react'
import { useHistory } from 'react-router-dom'
import {
  Placeholder, TableRow, TableCell, CheckBox, DropDown,
  DropDownTrigger, Icon, DropDownMenu, DropDownItem,
} from '@admin-bro/design-system'

import ActionButton from '../action-button'
import PropertyType from '../../property-type'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import ViewHelpers from '../../../../backend/utils/view-helpers'
import { display } from './records-table-header'
import { ActionResponse, RecordActionResponse } from '../../../../backend/actions/action.interface'
import mergeRecordResponse from '../../../hooks/use-record/merge-record-response'

type Props = {
  resource: ResourceJSON;
  record: RecordJSON;
  actionPerformed?: (action: ActionResponse) => any;
  isLoading?: boolean;
  onSelect?: (record: RecordJSON) => void;
  isSelected?: boolean;
}

const RecordInList: React.FC<Props> = (props) => {
  const {
    resource, record: recordFromProps, actionPerformed,
    isLoading, onSelect, isSelected,
  } = props
  const [record, setRecord] = useState<RecordJSON>(recordFromProps)
  const history = useHistory()

  useEffect(() => {
    setRecord(recordFromProps)
  }, [recordFromProps])

  const { recordActions } = record

  const show = record.recordActions.find(({ name }) => name === 'show')
  const edit = record.recordActions.find(({ name }) => name === 'edit')
  const actionName = (show && show.name) || (edit && edit.name)

  const handleClick = (event: React.MouseEvent<HTMLTableRowElement, MouseEvent>): void => {
    const h = new ViewHelpers()
    const targetTagName = (event.target as HTMLElement).tagName.toLowerCase()

    if (actionName
        && targetTagName !== 'a'
        && targetTagName !== 'button'
        && targetTagName !== 'svg') {
      const actionUrl = h.recordActionUrl({
        resourceId: resource.id,
        recordId: record.id,
        actionName,
        search: window.location.search,
      })
      history.push(actionUrl)
    }
  }

  const handleActionPerformed = useCallback((actionResponse: ActionResponse) => {
    if (actionResponse.record && !actionResponse.redirectUrl) {
      setRecord(mergeRecordResponse(record, actionResponse as RecordActionResponse))
    } else if (actionPerformed) {
      actionPerformed(actionResponse)
    }
  }, [actionPerformed])

  return (
    <TableRow onClick={(event): void => handleClick(event)} data-id={record.id}>
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
          <DropDown>
            <DropDownTrigger py="sm" px="xl" data-testid="actions-dropdown">
              <Icon icon="OverflowMenuHorizontal" color="grey100" />
            </DropDownTrigger>
            <DropDownMenu>
              {recordActions.map(action => (
                <DropDownItem key={action.name}>
                  <ActionButton
                    action={action}
                    resourceId={resource.id}
                    recordId={record.id}
                    actionPerformed={handleActionPerformed}
                  >
                    <Icon icon={action.icon} />
                    {action.label}
                  </ActionButton>
                </DropDownItem>
              ))}
            </DropDownMenu>
          </DropDown>
        ) : ''}
      </TableCell>
    </TableRow>
  )
}

export default RecordInList
