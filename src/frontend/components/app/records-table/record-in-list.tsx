import React from 'react'
import { withRouter, RouteComponentProps } from 'react-router-dom'

import ActionButton from '../action-button'
import PropertyType from '../../property-type'
import Dropdown from '../../ui/dropdown'
import Placeholder from '../../ui/placeholder'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import { PropertyPlace } from '../../../../backend/decorators/property-json.interface'
import { TableRow, TableCell, CheckBox } from '../../design-system'
import ViewHelpers from '../../../../backend/utils/view-helpers'

type Props = {
  resource: ResourceJSON;
  record: RecordJSON;
  actionPerformed?: (actionName: string) => any;
  isLoading?: boolean;
  onSelect?: (record: RecordJSON) => void;
  isSelected?: boolean;
}

class RecordInList extends React.PureComponent<Props & RouteComponentProps> {
  private actionName: string

  constructor(props) {
    super(props)
    const { record } = props

    this.handleClick = this.handleClick.bind(this)

    const show = record.recordActions.find(({ name }) => name === 'show')
    const edit = record.recordActions.find(({ name }) => name === 'edit')

    this.actionName = (show && show.name) || (edit && edit.name)
  }

  handleClick(event: React.MouseEvent<HTMLTableRowElement, MouseEvent>): void{
    const h = new ViewHelpers()
    const { resource, record, history } = this.props
    const targetTagName = event.target.tagName.toLowerCase()
    if (this.actionName
        && targetTagName !== 'a'
        && targetTagName !== 'button'
        && targetTagName !== 'svg') {
      const actionUrl = h.recordActionUrl({
        resourceId: resource.id,
        recordId: record.id,
        actionName: this.actionName,
        search: window.location.search,
      })
      history.push(actionUrl)
    }
  }

  render(): React.ReactChild {
    const {
      resource, record,
      actionPerformed, isLoading,
      onSelect, isSelected,
    } = this.props
    const { recordActions } = record
    return (
      <TableRow onClick={(event): void => this.handleClick(event)}>
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
                where={PropertyPlace.list}
                property={property}
                resource={resource}
                record={record}
              />
            )}
          </TableCell>
        ))}
        <TableCell key="options">
          {recordActions.length ? (
            <Dropdown className="is-right is-hoverable">
              {recordActions.map(action => (
                <ActionButton
                  action={action}
                  key={action.name}
                  resourceId={resource.id}
                  recordId={record.id}
                  actionPerformed={actionPerformed}
                  className="is-white in-dropdown"
                />
              ))}
            </Dropdown>
          ) : ''}
        </TableCell>
      </TableRow>
    )
  }
}

export default withRouter(RecordInList)
