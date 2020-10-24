import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'
import { cssClass, themeGet } from '@admin-bro/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers'
import { BrandingOptions } from '../../../../admin-bro-options.interface'
import allowOverride from '../../../hoc/allow-override'

type Props = {
  branding: BrandingOptions;
}

export const StyledLogo = styled(Link)`
  text-align: center;
  display: flex;
  align-content: center;
  justify-content: center;
  flex-shrink: 0;
  padding: ${themeGet('space', 'lg')} ${themeGet('space', 'xxl')} ${themeGet('space', 'xxl')};
  text-decoration: none;

  & > h1 {
    text-decoration: none;
    font-weight: ${themeGet('fontWeights', 'bolder')};
    font-size: ${themeGet('fontWeights', 'bolder')};
    color: ${themeGet('colors', 'grey80')};
    font-size: ${themeGet('fontSizes', 'xl')};
    line-height: ${themeGet('lineHeights', 'xl')};
  }

  & > img {
    max-width: 170px;
  }

  &:hover h1 {
    color: ${themeGet('colors', 'primary100')};
  }
`

const h = new ViewHelpers()

const SidebarBranding: React.FC<Props> = (props) => {
  const { branding } = props
  const { logo, companyName } = branding
  return (
    <StyledLogo
      className={cssClass('Logo')}
      to={h.dashboardUrl()}
    >
      {logo ? (
        <img
          src={logo}
          alt={companyName}
        />
      ) : <h1>{companyName}</h1>}
    </StyledLogo>
  )
}

export default allowOverride(SidebarBranding, 'SidebarBranding')
