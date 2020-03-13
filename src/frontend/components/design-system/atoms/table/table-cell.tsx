import styled from 'styled-components'
import { color, space, layout, SpaceProps, ColorProps, LayoutProps } from 'styled-system'

import TableHead from './table-head'
import { cssClass } from '../../utils/css-class'

/**
 * @component
 * @private
 */
const TableCell = styled.td<SpaceProps | ColorProps | LayoutProps>`
  border-bottom: 1px solid ${({ theme }): string => theme.colors.grey20};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  ${color}; 
  ${space};
  ${layout};

  ${TableHead} & {
    color: ${({ theme }): string => theme.colors.grey60};
    border: none;
  }
`

TableCell.defaultProps = {
  p: 'lg',
  color: 'grey100',
  className: cssClass('TableCell'),
}

export default TableCell
