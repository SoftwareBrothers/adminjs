import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { pathsType, brandingType } from '../../../types'
import ViewHelpers from '../../../../backend/utils/view-helpers'
import { colors, sizes } from '../../../styles/variables'

const BrandingBox = styled.div`
  margin-bottom: ${sizes.paddingLayout};
`

const LogoLink = styled(Link)`
  display: flex;
  align-items: center;
  color: ${colors.defaultText};
  font-weight: bold;
`

const LogoImage = styled.img`
  margin-right: ${sizes.padding};
`

const SidebarBranding = (props) => {
  const { paths, branding } = props
  const { logo, companyName } = branding
  const h = new ViewHelpers({ options: paths })
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

SidebarBranding.propTypes = {
  paths: pathsType.isRequired,
  branding: brandingType.isRequired,
}

export default SidebarBranding
