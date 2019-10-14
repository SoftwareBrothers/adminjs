import React from 'react'
import styled from 'styled-components'

const StyledWrapperBox = styled.section<Props>`
  padding: ${({ theme }): string => theme.sizes.paddingLayout};
  color: ${({ theme }): string => theme.colors.defaultText};
  flex-grow: 1;
  border: ${(props): string => (props.border ? `1px solid ${props.theme.colors.border}` : 'none')};
  background: ${(props): string => (props.border ? props.theme.colors.bck : 'transparent')};

  & > h1 {
    font-size: 22px;
    margin-top: ${({ theme }): string => theme.sizes.padding};
    margin-bottom: ${({ theme }): string => theme.sizes.padding};
  }
`

/**
 * Basic layout element which controls padding.
 *
 * @component
 * @example
 * return (
 *   <WrapperBox border>
 *     <h1>Header</h1>
 *     <p>Some inside content</p>
 *   </WrapperBox>
 * )
 */
const WrapperBox: React.FC<Props> = props => (<StyledWrapperBox {...props} />)

/**
 * @memberof WrapperBox
 */
type Props = {
  /**
   * If wrapper should have a border.
   */
  border?: boolean;
  style?: React.CSSProperties;
}

export default WrapperBox
