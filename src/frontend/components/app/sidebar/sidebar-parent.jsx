import React from 'react'
import styled from 'styled-components'

import { colors, sizes } from '../../../styles/variables'
import { resourceParentWithResourcesType } from '../../../types'
import SidebarResource from './sidebar-resource'

const Title = styled.span`
  background: ${colors.lightBck};
  padding-left: ${sizes.padding};
  padding-right: ${sizes.padding};
  line-height: 40px;
  border-radius: ${sizes.paddingLayout};
  display: flex;
  align-items: baseline;
  color: ${colors.defaultText};
  position: relative;

  & > i, & > svg {
    margin-right: ${sizes.paddingMin};
    color: ${colors.lightText};
    margin-right: ${sizes.padding};
  }
`

const ResourcesList = styled.ul`
  margin: ${sizes.padding} 0;
  padding-left: 40px;
`

class SidebarParent extends React.PureComponent {
  render() {
    const { parent } = this.props
    const { icon, name, resources } = parent

    return (
      <li>
        <Title>
          <i className={icon} />
          {name}
        </Title>
        <ResourcesList>
          {resources.map(resource => (
            <SidebarResource resource={resource} key={resource.id} />
          ))}
        </ResourcesList>
      </li>
    )
  }
}

SidebarParent.propTypes = {
  parent: resourceParentWithResourcesType.isRequired,
}

export default SidebarParent
