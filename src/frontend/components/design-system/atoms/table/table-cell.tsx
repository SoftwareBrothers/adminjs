import styled from 'styled-components'
import { color, space, SpaceProps, ColorProps } from 'styled-system'

import TableHead from './table-head'

/**
 * @component
 * @private
 */
const TableCell = styled.td<SpaceProps | ColorProps>`
  border-bottom: 1px solid ${({ theme }): string => theme.colors.greyPale};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  ${color}; 
  ${space};

  ${TableHead} & {
    color: ${({ theme }): string => theme.colors.grey};
    border: none;
  }
`

TableCell.defaultProps = {
  p: 'lg',
  color: 'black',
}

export default TableCell
