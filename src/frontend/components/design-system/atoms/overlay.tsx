import styled from 'styled-components'
import Box from './box'
import { cssClass } from '../utils/css-class'

export const Overlay = styled(Box)`

`

Overlay.defaultProps = {
  width: '100%',
  height: '100%',
  bg: 'grey100',
  opacity: 0.2,
  position: 'fixed',
  top: 0,
  left: 0,
  zIndex: 40,
  className: cssClass('Overlay'),
}

export default Overlay
