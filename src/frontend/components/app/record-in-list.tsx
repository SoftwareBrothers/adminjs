import React from 'react'
import styled from 'styled-components'

import ActionButton from './action-button'
import PropertyType from '../property-type'
import Dropdown from '../ui/dropdown'
import Placeholder from '../ui/placeholder'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import { PropertyPlace } from '../../../backend/decorators/property-json.interface'

const Td = styled.td`
  &&& {
    color: ${({ theme }): string => theme.colors.defaultText};
    & a:not(.in-dropdown) {
      color: ${({ theme }): string => theme.colors.primary};
    }
    &.main {
      font-weight: bold;
    }
  }
`

interface Props {
  resource: ResourceJSON;
  record: RecordJSON;
  actionPerformed?: (actionName: string) => any;
  isLoading: boolean;
}

export default class RecordInList extends React.PureComponent<Props> {
  render(): React.ReactChild {
    const { resource, record, actionPerformed, isLoading } = this.props
    const { recordActions } = record
    return (
      <tr>
        {resource.listProperties.map(property => (
          <Td key={property.name} className={resource.titleProperty.name === property.name ? 'main' : undefined}>
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
          </Td>
        ))}
        <Td key="options">
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
        </Td>
      </tr>
    )
  }
}
