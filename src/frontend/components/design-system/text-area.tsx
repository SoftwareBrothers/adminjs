import styled from 'styled-components'
import { space, fontSize, SpaceProps, FontSizeProps } from 'styled-system'
import { inputStyles } from './input'

const TextArea = styled.textarea<SpaceProps | FontSizeProps>`
  ${inputStyles}
  ${space};
  ${fontSize};
`

TextArea.defaultProps = {
  px: 3,
  py: 3,
  fontSize: 3,
}

export default TextArea
