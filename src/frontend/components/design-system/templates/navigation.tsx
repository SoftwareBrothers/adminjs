/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { Box } from '../atoms/box'

export const Navigation = styled(Box)`
  height: 100%;
  width: ${({ theme }): string => theme.sizes.sidebarWidth};
  padding: ${({ theme }): string => theme.space.lg};
  display: flex;
  flex-direction: column;
  overflow: auto;
  border-right: 1px solid ${({ theme }): string => theme.colors.greyPale};
  flex-shrink: 0;
  background: ${({ theme }): string => theme.colors.white};
  z-index: 50;
  transition: all 500ms;
  left: 0;

  &.hidden {
    left: -${({ theme }): string => theme.sizes.sidebarWidth};
    transition: all 500ms;
  }
`
