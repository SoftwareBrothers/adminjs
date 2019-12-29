import styled from 'styled-components'

const Th = styled.th`
  &&& {
    font-size: ${({ theme }): string => theme.fonts.min};
    text-transform: uppercase;
    color: ${({ theme }): string => theme.colors.lightText};
    font-weight: normal;
    padding: ${({ theme }): string => theme.sizes.padding};
    letter-spacing: 0.1em;
    border: none;
  }
`

export default Th
