import React from 'react'
import styled from 'styled-components'

const StyledFooter = styled.p`
  font-size: ${({ theme }): string => theme.fonts.min};
  text-align: center;
  color: ${({ theme }): string => theme.colors.lightText};

  & svg, & a {
    color:  ${({ theme }): string => theme.colors.love};
    margin: 0  ${({ theme }): string => theme.sizes.paddingMin};
  }
`

type Props = {
  hidden?: boolean;
}

const SidebarFooter: React.FC<Props> = (props) => {
  const { hidden } = props
  if (hidden) {
    return (
      <StyledFooter>
        <a
          href="http://softwarebrothers.co"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i className="fas fa-heart fa-2x" />
        </a>
      </StyledFooter>
    )
  }
  return (
    <StyledFooter>
      <span>
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
      </span>
    </StyledFooter>
  )
}

export default SidebarFooter
