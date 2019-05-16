import styled from 'styled-components'

const Hamburger = styled.i.attrs({
  className: 'fas fa-bars fa-2x',
})`
  cursor: pointer;
  display: block;
  float: left;
  margin: ${({ theme }) => theme.sizes.paddingMin};
`

export default Hamburger
