import styled from 'styled-components'
import {
  flexbox, FlexboxProps,
} from 'styled-system'

export type FlexProps = FlexboxProps

export const Flex = styled.section<FlexProps>`
  display: flex;
  ${flexbox};
`

Flex.defaultProps = {
  flexDirection: 'row',
}
