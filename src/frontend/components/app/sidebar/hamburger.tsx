import React from 'react'
import styled from 'styled-components'

const StyledHamburger = styled.a`
  cursor: pointer;
  display: block;
  float: left;
  width: 48px;
  height: 32px;
  padding: 10px ${({ theme }): string => theme.sizes.padding};
  position: relative;
  z-index: 10;

  & > div {
    width: 100%;
    height: 2px;
    background-color: ${({ theme }): string => theme.colors.defaultText};
    margin-bottom: 3px;
  }
`

type Props = {
  onClick: (event: any) => void;
}

const Hamburger: React.FC<Props> = props => (
  <StyledHamburger {...props}>
    <div />
    <div />
    <div />
  </StyledHamburger>
)

export default Hamburger
