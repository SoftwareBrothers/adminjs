import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

/**
 * @component
 * @private
 */
export const DrawerContent = styled.section<SpaceProps>`
  flex-grow: 1;
  overflow: auto;
  padding: ${({ theme }): string => theme.space.x3} ${({ theme }): string => theme.space.xxl} ${({ theme }): string => theme.space.xl};
  box-sizing: border-box;
  ${space};
`

export default DrawerContent
