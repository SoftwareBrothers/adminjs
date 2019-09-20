import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ActionButton from './action-button'
import PropertyType from '../property-type'
import Dropdown from '../ui/dropdown'
import Placeholder from '../ui/placeholder'
import { resourceType, recordType } from '../../types'

const Td = styled.td`
  &&& {
    color: ${({ theme }) => theme.colors.defaultText};
    & a:not(.in-dropdown) {
      color: ${({ theme }) => theme.colors.primary};
    }
    &.main {
      font-weight: bold;
    }
  }
`

export default class RecordInList extends React.PureComponent {
  render() {
    const { resource, record, actionPerformed, isLoading } = this.props
    const { recordActions } = resource
    return (
      <tr>
        {resource.listProperties.map(property => (
          <Td key={property.name} className={resource.titleProperty.name === property.name ? 'main' : null}>
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

RecordInList.propTypes = {
  resource: resourceType.isRequired,
  record: recordType.isRequired,
  actionPerformed: PropTypes.func.isRequired,
  isLoading: PropTypes.bool.isRequired,
}
