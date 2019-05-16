import React from 'react'
import styled from 'styled-components'

import { resourceParentWithResourcesType } from '../../../types'
import SidebarResource from './sidebar-resource'

const Title = styled.span`
  background: ${({ theme }) => theme.colors.lightBck};
  padding-left: ${({ theme }) => theme.sizes.padding};
  padding-right: ${({ theme }) => theme.sizes.padding};
  line-height: 40px;
  border-radius: ${({ theme }) => theme.sizes.paddingLayout};
  display: flex;
  align-items: baseline;
  color: ${({ theme }) => theme.colors.defaultText};
  position: relative;

  & > i, & > svg {
    margin-right: ${({ theme }) => theme.sizes.paddingMin};
    color: ${({ theme }) => theme.colors.lightText};
    margin-right: ${({ theme }) => theme.sizes.padding};
  }
`

const ResourcesList = styled.ul`
  margin: ${({ theme }) => theme.sizes.padding} 0;
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
