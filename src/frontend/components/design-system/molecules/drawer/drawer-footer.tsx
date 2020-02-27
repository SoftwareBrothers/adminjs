import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

/**
 * @component
 * @private
 */
export const DrawerFooter = styled.section<SpaceProps>`
  padding: ${({ theme }): string => theme.space.xxl} ${({ theme }): string => theme.space.lg};
  text-align: center;
  flex-shrink: 0;
  ${space};
`

export default DrawerFooter
