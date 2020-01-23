import styled from 'styled-components'
import {
  flexbox, FlexboxProps,
} from 'styled-system'

const Flex = styled.section<FlexboxProps>`
  display: flex;
  ${flexbox};
`

Flex.defaultProps = {
  flexDirection: 'row',
}

export default Flex
