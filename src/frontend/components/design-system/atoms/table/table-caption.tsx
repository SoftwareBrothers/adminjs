import styled from 'styled-components'

const TableCaption = styled.caption`
  font-family: ${({ theme }): string => theme.font};
  padding: ${({ theme }): string => theme.space[4]};
  text-align: left;
  color: ${({ theme }): string => theme.colors.grey};
  font-size: ${({ theme }): string => theme.fontSizes[2]};
  line-height: ${({ theme }): string => theme.lineHeights[2]};
`

export default TableCaption
