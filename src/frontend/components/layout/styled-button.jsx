import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { sizes, colors, fonts } from '../../styles/variables'

const StyledButton = styled(Link).attrs(({ primary }) => ({
  className: `button${primary ? ' is-primary' : ''}`,
}))`
  font-size: ${fonts.medium};
  border-radius: 0;
  border-color: ${colors.primary};
  background: #fff;
  height: 32px;
  padding: ${sizes.paddingMin} ${sizes.padding};
  color: ${colors.primary};
  &:hover {
    border-color: ${colors.primaryHover};
  }
  &.is-primary {
    background-color: ${colors.primary};
    color: #ffffff;
    &:hover {
      background-color: ${colors.primaryHover};
    }
  }

  &.is-text {
    background-color: transparent;
    color: ${colors.primary};
    border: transparent;
  }

  &.in-dropdown {
    color: ${colors.defaultText};
    font-size: ${fonts.base};
    width: 100%;
    text-align: start;
    justify-content: flex-start;
    height: 40px;
    padding-left: 40px;
  }
`

export default StyledButton
