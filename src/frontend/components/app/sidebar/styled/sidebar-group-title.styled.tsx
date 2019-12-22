import styled from 'styled-components'

const SidebarGroupTitle = styled.span`
  background: ${({ theme }): string => theme.colors.lightBck};
  padding-left: ${({ theme }): string => theme.sizes.padding};
  padding-right: ${({ theme }): string => theme.sizes.padding};
  line-height: 40px;
  border-radius: ${({ theme }): string => theme.sizes.paddingLayout};
  display: flex;
  align-items: baseline;
  color: ${({ theme }): string => theme.colors.defaultText};
  position: relative;

  & > i, & > svg {
    margin-right: ${({ theme }): string => theme.sizes.paddingMin};
    color: ${({ theme }): string => theme.colors.lightText};
    margin-right: ${({ theme }): string => theme.sizes.padding};
  }
`

export default SidebarGroupTitle
