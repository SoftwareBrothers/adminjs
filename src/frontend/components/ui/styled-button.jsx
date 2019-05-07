import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { sizes, colors, fonts } from '../../styles/variables'

const Btn = styled(Link).attrs(({ primary }) => ({
  className: `button${primary ? ' is-primary' : ''}`,
}))`
  &&& {
    font-size: ${fonts.medium};
    border-radius: 0;
    border-color: ${colors.primary};
    background: #fff;
    height: 32px;
    padding: ${sizes.paddingMin} ${sizes.padding};
    color: ${colors.primary};
    & i, & svg {
      margin-right: 5px;
    }
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
      border: none;

      &:hover {
        border: 4px ${colors.primary};
        padding-left: 36px;
        border-style: none solid;
      }
    }
  }
`

/**
 * @classdesc
 * Base button component
 *
 * @component
 * @hideconstructor
 *
 * @example
 * return (
 *   <Columns>
 *     <Column><StyledButton>Regular button</StyledButton></Column>
 *     <Column><StyledButton primary>Primary</StyledButton></Column>
 *     <Column><StyledButton><i class="fa fa-bomb" />With icon</StyledButton></Column>
 *   </Columns>
 * )
 */
const StyledButton = props => (<Btn {...props} />)

StyledButton.propTypes = {
  /**
   * If button should be presented as a primary action
   */
  primary: PropTypes.bool,
}

StyledButton.defaultProps = {
  primary: undefined,
}

export default StyledButton
