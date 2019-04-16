import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

import { sizes, colors } from '../../styles/variables'

const Wrapper = styled.section.attrs({
  className: 'content',
})`
  && {
    padding: ${sizes.paddingLayout};
    background: ${colors.superDarkBck};
    color: #fff;
    margin-bottom: 0;
    & > * {
      color: #fff;
    }

    & > h1 {
      font-size: 53px;
      margin-bottom: 2px;
    }
  }
`

const DashboardHeader = (props) => {
  const { children } = props
  return (
    <Wrapper>
      {children}
    </Wrapper>
  )
}

DashboardHeader.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.arrayOf(PropTypes.element)]),
}

DashboardHeader.defaultProps = {
  children: null,
}

export default DashboardHeader
