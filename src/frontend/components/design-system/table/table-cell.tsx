import styled from 'styled-components'
import { color, space, fontSize, SpaceProps, FontSizeProps, ColorProps, variant } from 'styled-system'

import TableHead from './table-head'

const TableCell = styled.td<SpaceProps | FontSizeProps | ColorProps>`
  border-top: 1px solid ${({ theme }): string => theme.colors.border};
  ${color}; 
  ${space};
  ${fontSize};

  ${TableHead} & {
    border-top: none;
  }
`

TableCell.defaultProps = {
  p: 4,
  color: 'textDefault',
}

export default TableCell
