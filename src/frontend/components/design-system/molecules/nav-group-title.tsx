/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { Text } from '../atoms/text'

export const NavGroupTitle = styled(Text)`
  padding: 11px 20px;
  color: ${({ theme }): string => theme.colors.black};
  border-radius: 9999px;
  display: flex;
  cursor: pointer;

  & span {
    display: block;
    flex-grow: 1;
    line-height: ${({ theme }): string => theme.space[4]};
  }

  & svg {
    vertical-align: middle;
    padding-bottom: 'sm'px;
    flex-shrink: 0;
  }
  & svg:first-child {
    padding-right: ${({ theme }): string => theme.space[4]};
  }

  & svg:last-child {
    
  }
`
