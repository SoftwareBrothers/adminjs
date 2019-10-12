import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import ViewHelpers from '../../../../backend/utils/view-helpers'
import { BrandingOptions } from '../../../../admin-bro-options.interface'

const BrandingBox = styled.div`
  margin-bottom: 40px;
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${({ theme }): string => theme.colors.defaultText};
  font-weight: bold;
  span {
    font-size: 20px;
  }
`

const LogoImage = styled.img`
  margin-right: ${({ theme }): string => theme.sizes.padding};
  height: 35px;
`

type Props = {
  branding: BrandingOptions;
}

const SidebarBranding: React.FC<Props> = (props) => {
  const { branding } = props
  const { logo, companyName } = branding
  const h = new ViewHelpers()
  return (
    <BrandingBox>
      <LogoLink to={h.dashboardUrl()}>
        <LogoImage
          src={logo}
          alt={companyName}
          height="35px"
          width="35px"
        />
        <span>{companyName}</span>
      </LogoLink>
    </BrandingBox>
  )
}

export default SidebarBranding
