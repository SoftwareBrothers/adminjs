import styled from 'styled-components'
import { cssClass } from '../../utils/css-class'

/**
 * @component
 * @private
 */
const TableRow = styled.tr`
  &:hover {
    background: ${({ theme }): string => theme.colors.grey20};
  }
`

TableRow.defaultProps = {
  className: cssClass('TableRow'),
}

export default TableRow
