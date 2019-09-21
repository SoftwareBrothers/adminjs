import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

const Btn = styled(Link).attrs(({ primary }) => ({
  className: `button${primary ? ' is-primary' : ''}`,
}))`
  &&& {
    font-size: ${({ theme }) => theme.fonts.medium};
    border-radius: 0;
    border-color: ${({ theme }) => theme.colors.primary};
    background: #fff;
    height: 34px;
    padding:  ${({ theme }) => `${theme.sizes.paddingMin} ${theme.sizes.padding}`};
    color: ${({ theme }) => theme.colors.primary};
    & i, & svg {
      margin-right: 5px;
    }
    &:hover {
      border-color: ${({ theme }) => theme.colors.primaryHover};
    }

    &.is-white {
      background-color: #fff;
      border-color: transparent;
      color: ${({ theme }) => theme.colors.defaultText};
    }

    &.is-primary {
      background-color: ${({ theme }) => theme.colors.primary};
      color: #ffffff;
      &:hover {
        background-color: ${({ theme }) => theme.colors.primaryHover};
      }
    }

    &.is-text {
      background-color: transparent;
      color: ${({ theme }) => theme.colors.primary};
      border: transparent;
    }

    &.in-dropdown {
      color: ${({ theme }) => theme.colors.defaultText};
      font-size: ${({ theme }) => theme.fonts.base};
      width: 100%;
      text-align: start;
      justify-content: flex-start;
      height: 40px;
      padding-left: 40px;
      border: none;

      &:hover {
        border: 4px ${({ theme }) => theme.colors.primary};
        padding-left: 36px;
        border-style: none solid;
      }
    }
  }
`

/**
 * Base button component
 *
 * @component
 * @example <caption>Regular button</caption>
 * return (
 *   <WrapperBox border>
 *     <StyledButton>I am button</StyledButton>
 *   </WrapperBox>
 * )
 *
 * @example <caption>Primary button</caption>
 * return (
 *   <WrapperBox border>
 *     <StyledButton primary>I am primary button</StyledButton>
 *   </WrapperBox>
 * )
 *
 * @example <caption>With icon</caption>
 * return (
 *   <WrapperBox border>
 *     <StyledButton><i class="fa fa-bomb" />I am button with icon</StyledButton>
 *   </WrapperBox>
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
