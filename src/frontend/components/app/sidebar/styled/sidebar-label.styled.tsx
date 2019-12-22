import styled from 'styled-components'

const SidebarLabel = styled.h2`
  margin-top: ${({ theme }): string => theme.sizes.padding};
  margin-left: ${({ theme }): string => theme.sizes.padding};
  margin-bottom: ${({ theme }): string => theme.sizes.padding};
  color: ${({ theme }): string => theme.colors.lightText};
  font-size: ${({ theme }): string => theme.fonts.min};
  text-transform: uppercase;
  letter-spacing: .1em;
`

export default SidebarLabel
