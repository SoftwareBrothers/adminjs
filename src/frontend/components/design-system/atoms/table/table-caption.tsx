import styled from 'styled-components'
import { Button } from '../button'
import { Text } from '../text'
import { cssClass } from '../../utils/css-class'

const CAPTION_HEIGHT = '42px'

/**
 * @component
 * @private
 */
const TableCaption = styled.caption`
  font-family: ${({ theme }): string => theme.font};
  padding: ${({ theme }): string => theme.space.sm} ${({ theme }): string => theme.space.lg};
  text-align: left;
  color: ${({ theme }): string => theme.colors.white};
  font-size: ${({ theme }): string => theme.fontSizes.default};
  line-height: ${({ theme }): string => theme.lineHeights.default};
  position: absolute;
  height: ${CAPTION_HEIGHT};
  left: 0;
  right: 0;
  top: -${CAPTION_HEIGHT};
  background: ${({ theme }): string => theme.colors.primary100};
  box-sizing: border-box;

  & ${Button} {
    color: ${({ theme }): string => theme.colors.white};
    & > span svg {
      fill: ${({ theme }): string => theme.colors.white};
    }
    &:hover {
      color: ${({ theme }): string => theme.colors.white};
    }
  }

  & ${Text} {
    color: ${({ theme }): string => theme.colors.white};
  }
`

TableCaption.defaultProps = {
  className: cssClass('TableCaption'),
}

export default TableCaption
