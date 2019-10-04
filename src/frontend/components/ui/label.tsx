import React, { ReactNode } from 'react'
import styled from 'styled-components'

const StyledLabel = styled.label.attrs({
  className: 'label',
})`
  &&& {
    display: block;
    text-transform: uppercase;
    font-size: ${({ theme }): string => theme.fonts.min};
    color: ${({ theme }): string => theme.colors.lightText};
    font-weight: normal;
    margin: 0 0 8px 0;
    letter-spacing: 0.1em;
  }
`

/**
 * @class
 * Represents labels inside the application.
 *
 * @component
 * @example
 * return (
 * <WrapperBox border>
 *   <Label>Some Label:</Label>
 *   <p>Text below the label</p>
 * </WrapperBox>
 * )
 */
const Label: React.FC<Props> = props => (<StyledLabel {...props} />)

/**
 * @memberof Label
 */
type Props = {
  children: ReactNode;
  style?: React.CSSProperties;
  htmlFor?: string;
}

export default Label
