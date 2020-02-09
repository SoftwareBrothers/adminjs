import styled from 'styled-components'

import Text from '../../atoms/text'

/**
 * @component
 * @private
 */
const FormMessage = styled(Text)`
  box-sizing: border-box;
  vertical-align: middle;
  height: ${({ theme }): string => theme.space.xl};
  margin: ${({ theme }): string => theme.space.sm} 0 0;
  font-weight: normal;
  font-size: ${({ theme }): string => theme.fontSizes.sm};
`

export default FormMessage
