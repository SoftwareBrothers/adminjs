import React, { ReactNode } from 'react'
import styled from 'styled-components'

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
const Label = styled.label.attrs({
  className: 'label',
})`
  &&& {
    display: block;
    text-transform: uppercase;
    font-size: ${({ theme }): string => theme.fontSizes.sm};
    color: ${({ theme }): string => theme.colors.darkGrey};
    font-weight: normal;
    margin: 0 0 8px 0;
    letter-spacing: 0.1em;
  }
`

/**
 * @memberof Label
 */
type Props = {
  children: ReactNode;
  style?: React.CSSProperties;
  htmlFor?: string;
}

export default Label
