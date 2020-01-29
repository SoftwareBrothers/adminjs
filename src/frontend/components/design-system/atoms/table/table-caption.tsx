import styled from 'styled-components'

const TableCaption = styled.caption`
  font-family: ${({ theme }): string => theme.font};
  padding: ${({ theme }): string => theme.space.lg};
  text-align: left;
  color: ${({ theme }): string => theme.colors.grey};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  line-height: ${({ theme }): string => theme.lineHeights.default};
`

export default TableCaption
