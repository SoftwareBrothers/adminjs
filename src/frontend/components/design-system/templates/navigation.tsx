/* eslint-disable import/prefer-default-export */
import styled from 'styled-components'
import { Box } from '../atoms/box'

export const Navigation = styled(Box)`
  height: 100%;
  width: ${({ theme }): string => theme.sizes.sidebarWidth};
  padding: ${({ theme }): string => theme.space.xl};
  display: flex;
  flex-direction: column;
`
