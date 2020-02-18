import React from 'react'
import { useHistory } from 'react-router-dom'

import ActionButton from '../action-button'
import PropertyType from '../../property-type'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import {
  Placeholder, TableRow, TableCell, CheckBox, DropDown,
  DropDownTrigger, Icon, DropDownMenu, DropDownItem,
} from '../../design-system'
import ViewHelpers from '../../../../backend/utils/view-helpers'
import { useTranslation } from '../../../hooks/use-translation'

type Props = {
  resource: ResourceJSON;
  record: RecordJSON;
  actionPerformed?: (actionName: string) => any;
  isLoading?: boolean;
  onSelect?: (record: RecordJSON) => void;
  isSelected?: boolean;
}

const RecordInList: React.FC<Props> = (props) => {
  const { resource, record, actionPerformed, isLoading, onSelect, isSelected } = props
  const { recordActions } = record

  const history = useHistory()

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

  return (
    <TableRow onClick={(event): void => handleClick(event)}>
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
            <DropDownTrigger py="sm" px="xl">
              <Icon icon="OverflowMenuHorizontal" />
            </DropDownTrigger>
            <DropDownMenu>
              {recordActions.map(action => (
                <DropDownItem key={action.name}>
                  <ActionButton
                    action={action}
                    resourceId={resource.id}
                    recordId={record.id}
                    actionPerformed={actionPerformed}
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
