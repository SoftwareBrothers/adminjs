import styled from 'styled-components'

/**
 * @component
 */
const TableRow = styled.tr`
  &:hover {
    background: ${({ theme }): string => theme.colors.greyPale};
  }
`

export default TableRow
