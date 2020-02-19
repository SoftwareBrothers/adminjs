import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ViewHelpers from '../../../../backend/utils/view-helpers'
import { BrandingOptions } from '../../../../admin-bro-options.interface'
import { H5 } from '../../design-system'

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${({ theme }): string => theme.colors.grey80};

  & > img {
    margin-right: 12px;
  }
`

type Props = {
  branding: BrandingOptions;
}

const SidebarBranding: React.FC<Props> = (props) => {
  const { branding } = props
  const { logo, companyName } = branding
  const h = new ViewHelpers()
  return (
    <H5>
      <LogoLink to={h.dashboardUrl()}>
        {logo && (
          <img
            src={logo}
            alt={companyName}
            height="35px"
          />
        )}
        <span>{companyName}</span>
      </LogoLink>
    </H5>
  )
}

export default SidebarBranding
