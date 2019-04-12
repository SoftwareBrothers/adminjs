import styled from 'styled-components'
import { sizes } from '../../../styles/variables'

const Hamburger = styled.i.attrs({
  className: 'fas fa-bars fa-2x',
})`
  cursor: pointer;
  display: block;
  float: left;
  margin: ${sizes.paddingMin};
`

export default Hamburger
