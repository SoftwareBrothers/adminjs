import styled from 'styled-components'

/**
 * @component
 * @private
 */
const TableRow = styled.tr`
  &:hover {
    background: ${({ theme }): string => theme.colors.grey20};
  }
`

export default TableRow
