import React from 'react'
import styled from 'styled-components'

import { ReduxState } from '../../../store/store'
import SidebarLabel from './styled/sidebar-label.styled'
import SidebarLink from './styled/sidebar-link.styled'
import ViewHelpers from '../../../../backend/utils/view-helpers'
import SidebarSection from './styled/sidebar-section.styled'

const PagesListWrapper = styled.div`
  &&& {
    padding-left: 10px;
  }
`

type Props = {
  pages?: ReduxState['pages'];
}

const SidebarPages: React.FC<Props> = (props) => {
  const { pages } = props
  const h = new ViewHelpers()

  if (!pages || !pages.length) {
    return (<></>)
  }

  const isActive = (page, location): boolean => (
    !!location.pathname.match(`/pages/${page.name}`)
  )

  return (
    <SidebarSection>
      <SidebarLabel>Pages</SidebarLabel>
      <PagesListWrapper>
        {pages.map(page => (
          <SidebarLink
            to={h.pageUrl(page.name)}
            key={page.name}
            isActive={(match, location): boolean => isActive(page, location)}
            data-testid="sidebar-page-link"
          >
            {page.label}
          </SidebarLink>
        ))}
      </PagesListWrapper>
    </SidebarSection>
  )
}

export default SidebarPages
