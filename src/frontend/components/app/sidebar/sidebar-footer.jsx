import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.p`
  font-size: ${({ theme }) => theme.fonts.min};
  text-align: center;
  color: ${({ theme }) => theme.colors.lightText};

  & > svg, & > a {
    color: ${({ theme }) => theme.colors.love};
    margin: 0 ${({ theme }) => theme.sizes.paddingMin};
  }
`

const SidebarFooter = () => (
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
