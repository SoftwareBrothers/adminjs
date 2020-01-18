import styled from 'styled-components'

const TableRow = styled.tr`
  &:hover {
    background: ${({ theme }): string => theme.colors.tableHover};
  }
`

export default TableRow
