import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import ActionButton from './action-button'
import PropertyType from '../property-type'
import { colors, sizes } from '../../styles/variables'
import { resourceType, recordType } from '../../types'

const Td = styled.td`
  &&& {
    color: ${colors.defaultText};
    padding: ${sizes.padding};
    border-color: ${colors.border};

    & a:not(.in-dropdown) {
      color: ${colors.primary};
    }

    &.main {
      font-weight: bold;
    }
  }
`

const DropdownTrigger = styled.div.attrs({
  className: 'dropdown-trigger',
})`
  padding: 0px ${sizes.padding};
  font-size: 20px;
  line-height: 20px;
  &:hover {
    background: #fff;
  }
`

const DropdownMenu = styled.div.attrs({
  className: 'dropdown-menu',
})`
  & > .dropdown-content {
    border: 0px none;
    border-radius: 0px;
    box-shadow: 0 6px 13px 0 rgba(69,70,85,0.13);
  }
`

const ActionsDropdown = (props) => {
  const { children } = props
  return (
    <div className="dropdown is-right is-hoverable">
      <DropdownTrigger>
        <i className="icomoon-options" />
      </DropdownTrigger>
      <DropdownMenu>
        <div className="dropdown-content">
          {children}
        </div>
      </DropdownMenu>
    </div>
  )
}

export default class RecordInList extends React.PureComponent {
  render() {
    const { resource, record, actionPerformed } = this.props
    const { recordActions } = resource
    return (
      <tr>
        {resource.listProperties.map(property => (
          <Td key={property.name} className={resource.titleProperty.name === property.name ? 'main' : null}>
            <PropertyType
              key={property.name}
              where="list"
              property={property}
              resource={resource}
              record={record}
            />
          </Td>
        ))}
        <Td key="options">
          <ActionsDropdown>
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
          </ActionsDropdown>
        </Td>
      </tr>
    )
  }
}

RecordInList.propTypes = {
  resource: resourceType.isRequired,
  record: recordType.isRequired,
  actionPerformed: PropTypes.func.isRequired,
}

ActionsDropdown.propTypes = {
  children: PropTypes.node,
}

ActionsDropdown.defaultProps = {
  children: null,
}
