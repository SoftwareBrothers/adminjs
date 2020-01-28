import styled from 'styled-components'
import { color, space, SpaceProps, ColorProps } from 'styled-system'

import TableHead from './table-head'

const TableCell = styled.td<SpaceProps | ColorProps>`
  border-top: 1px solid ${({ theme }): string => theme.colors.greyPale};
  font-size: ${({ theme }): string => theme.fontSizes[2]};
  line-height: ${({ theme }): string => theme.lineHeights[1]};
  ${color}; 
  ${space};

  ${TableHead} & {
    border: none;
    color: ${({ theme }): string => theme.colors.grey};
  }
`

TableCell.defaultProps = {
  p: 4,
  color: 'black',
}

export default TableCell
