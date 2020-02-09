import styled from 'styled-components'

/**
 * @component
 * @private
 */
const TableRow = styled.tr`
  &:hover {
    background: ${({ theme }): string => theme.colors.greyPale};
  }
`

export default TableRow
