import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'

/**
 * @component
 * @private
 */
export const DropDownTrigger = styled.span<SpaceProps>`
  display: inline-block;
  ${space};
`
DropDownTrigger.displayName = 'DropDownTrigger'

export default DropDownTrigger
