import React, { ReactNode } from 'react'
import styled from 'styled-components'

import SidebarResource from './sidebar-resource'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

const Title = styled.span`
  background: ${({ theme }): string => theme.colors.lightBck};
  padding-left: ${({ theme }): string => theme.sizes.padding};
  padding-right: ${({ theme }): string => theme.sizes.padding};
  line-height: 40px;
  border-radius: ${({ theme }): string => theme.sizes.paddingLayout};
  display: flex;
  align-items: baseline;
  color: ${({ theme }): string => theme.colors.defaultText};
  position: relative;

  & > i, & > svg {
    margin-right: ${({ theme }): string => theme.sizes.paddingMin};
    color: ${({ theme }): string => theme.colors.lightText};
    margin-right: ${({ theme }): string => theme.sizes.padding};
  }
`

const ResourcesList = styled.ul`
  margin: ${({ theme }): string => theme.sizes.padding} 0;
  padding-left: 40px;
`

type Props = {
  parent: {
    icon: string;
    name: string;
    resources: Array<ResourceJSON>;
  };
}

class SidebarParent extends React.PureComponent<Props> {
  render(): ReactNode {
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

export default SidebarParent
