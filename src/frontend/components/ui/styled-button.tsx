import React, { ReactNode } from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
const StyledButton = styled(Link).attrs<Props>(({ primary }) => ({
  className: `button${primary ? ' is-primary' : ''}`,
}))`
  &&& {
    font-size: ${({ theme }): string => theme.fonts.medium};
    border-radius: 0;
    border-color: ${({ theme }): string => theme.colors.primary};
    background: #fff;
    height: 34px;
    padding:  ${({ theme }): string => `${theme.sizes.paddingMin} ${theme.sizes.padding}`};
    color: ${({ theme }): string => theme.colors.primary};
    & i, & svg {
      margin-right: 5px;
    }
    &:hover {
      border-color: ${({ theme }): string => theme.colors.primaryHover};
    }

    &.is-white {
      background-color: #fff;
      border-color: transparent;
      color: ${({ theme }): string => theme.colors.defaultText};
    }

    &.is-primary {
      background-color: ${({ theme }): string => theme.colors.primary};
      color: #ffffff;
      &:hover {
        background-color: ${({ theme }): string => theme.colors.primaryHover};
      }
    }

    &.is-text {
      background-color: transparent;
      color: ${({ theme }): string => theme.colors.primary};
      border: transparent;
    }

    &.in-dropdown {
      color: ${({ theme }): string => theme.colors.defaultText};
      font-size: ${({ theme }): string => theme.fonts.base};
      width: 100%;
      text-align: start;
      justify-content: flex-start;
      height: 40px;
      padding-left: 40px;
      border: none;

      &:hover {
        border: 4px ${({ theme }): string => theme.colors.primary};
        padding-left: 36px;
        border-style: none solid;
      }
    }
  }
`

/**
 * @memberof StyledButton
 */
type Props = {
  /**
   * If button should be presented as a primary action
   */
  primary: boolean;
  children: ReactNode;
  onClick: () => any;
  as: string;
  to: string;
}

export default StyledButton
