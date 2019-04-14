import styled from 'styled-components'

import { sizes, colors } from '../../styles/variables'

const BorderBox = styled.section.attrs({
  className: 'border-box',
})`
  background: #ffffff;
  padding: ${sizes.paddingLayout};
  border: 1px solid ${colors.border};
`

export default BorderBox
