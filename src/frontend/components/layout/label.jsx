import styled from 'styled-components'

import { fonts, colors, sizes } from '../../styles/variables'

const Label = styled.label.attrs({
  className: 'label',
})`
  &&& {
    display: block;
    text-transform: uppercase;
    font-size: ${fonts.min};
    color: ${colors.lightText};
    font-weight: normal;
    margin: 0 0 ${sizes.paddingMin} 0;
    letter-spacing: 0.1em;
  }
`
export default Label
