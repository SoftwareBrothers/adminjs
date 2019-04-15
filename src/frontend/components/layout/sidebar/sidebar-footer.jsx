import React from 'react'
import styled from 'styled-components'

import { colors, fonts, sizes } from '../../../styles/variables'

const StyledFooter = styled.p`
  font-size: ${fonts.min};
  text-align: center;
  color: ${colors.lightText};

  & > svg, & > a {
    color: ${colors.love};
    margin: 0 ${sizes.paddingMin};
  }
`


const SidebarFooter = props => (
  <StyledFooter>
      With
    <i className="fas fa-heart" />
      by
    <a
      href="http://softwarebrothers.co"
      target="_blank"
      rel="noopener noreferrer"
    >
        SoftwareBrothers
    </a>
  </StyledFooter>
)

export default SidebarFooter
