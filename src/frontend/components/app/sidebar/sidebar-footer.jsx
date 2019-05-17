import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { colors, fonts, sizes } from '../../../styles/variables'

const StyledFooter = styled.p`
  font-size: ${fonts.min};
  text-align: center;
  color: ${colors.lightText};

  & svg, & a {
    color: ${colors.love};
    margin: 0 ${sizes.paddingMin};
  }
`


const SidebarFooter = (props) => {
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

SidebarFooter.propTypes = {
  hidden: PropTypes.bool,
}

SidebarFooter.defaultProps = {
  hidden: false,
}

export default SidebarFooter
