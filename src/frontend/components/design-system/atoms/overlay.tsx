import styled from 'styled-components'
import Box from './box'

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
}

export default Overlay
