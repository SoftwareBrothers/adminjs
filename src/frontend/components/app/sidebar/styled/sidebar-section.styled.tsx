import styled from 'styled-components'

const SidebarSection = styled.section`
  padding: ${({ theme }): string => `${theme.sizes.padding} ${theme.sizes.paddingLayout}`};
  width:  ${({ theme }): string => theme.sizes.sidebarWidth};
  transition: padding 0.5s;
  & > section {
    opacity: 1;
    transition: opacity 0.5s;
  }
`
export default SidebarSection
