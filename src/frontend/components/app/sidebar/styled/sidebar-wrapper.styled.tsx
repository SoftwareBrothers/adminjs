import styled from 'styled-components'

const SidebarWrapper = styled.aside`
  display: flex;
  flex-shrink: 0;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  overflow-y: auto;
  overflow-x: hidden;
  background: ${({ theme }): string => theme.colors.bck};
  border-right: 1px solid ${({ theme }): string => theme.colors.border};
  width: ${({ theme }): string => theme.sizes.sidebarWidth};
  transition: width 0.5s;

  &.hidden {
    width: 50px;
    transition: width 0.5s;
    overflow: hidden;
    & > section {
      padding:  ${({ theme }): string => theme.sizes.padding} 4px;
      transition: padding 0.5s;
      & > section {
        opacity: 0;
        transition: opacity 0.5s;
      }
    }
  }
`

export default SidebarWrapper
