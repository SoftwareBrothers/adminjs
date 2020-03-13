import styled from 'styled-components'
import { cssClass } from '../../utils/css-class'

/**
 * @component
 * @private
 */
const TableHead = styled.thead`
  background: ${({ theme }): string => theme.colors.grey20};

  & a {
    color: ${({ theme }): string => theme.colors.grey60};
    text-decoration: none;
    font-size: ${({ theme }): string => theme.fontSizes.sm};
    white-space: nowrap;
  }
`

TableHead.defaultProps = {
  className: cssClass('TableHead'),
}

export default TableHead
