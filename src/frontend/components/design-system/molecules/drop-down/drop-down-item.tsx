import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

import Link from '../../atoms/link'

/**
 * @component
 * @private
 */
export const DropDownItem = styled.span<SpaceProps>`
  position: relative;
  z-index: 10000;
  border: none;
  color: ${({ theme }): string => theme.colors.grey80};
  display: block;
  font-family: ${({ theme }): string => theme.font};
  border: solid transparent;
  border-width: 0 ${({ theme }): string => theme.space.sm};
  &:hover {
    border-color: ${({ theme }): string => theme.colors.primary100};
    background: ${({ theme }): string => theme.colors.grey20};
  }
  & svg {
    vertical-align: middle;
    padding-bottom: 2px;
    padding-right: ${({ theme }): string => theme.space.default};
    fill: ${({ theme }): string => theme.colors.grey40};
  }
  & a {
    color: ${({ theme }): string => theme.colors.grey80};
  }

  ${space};

  & > ${Link}, & > a {
    padding: ${({ theme }): string => theme.space.lg};
    display: block;
    &:hover{
      text-decoration: none;
    }
  }
`

export default DropDownItem
