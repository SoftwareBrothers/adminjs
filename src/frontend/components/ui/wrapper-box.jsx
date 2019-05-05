import styled from 'styled-components'

import { sizes, colors } from '../../styles/variables'

/**
 * @component
 * props = {
 *   children: 'Some inner child wrapped with a default padding',
 *   border: true,
 * };
 * @class
 */
const WrapperBox = styled.section`
  padding: ${sizes.paddingLayout};
  flex-grow: 1;
  border: ${props => (props.border ? `1px solid ${colors.border}` : 'none')};
  background: ${props => (props.border ? '#ffffff' : 'transparent')};
`

export default WrapperBox
