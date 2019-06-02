import React from 'react'
import styled from 'styled-components'

const StyledHamburger = styled.a`
  cursor: pointer;
  display: block;
  float: left;
  width: 48px;
  height: 32px;
  padding: 10px ${({ theme }) => theme.sizes.padding};
  position: relative;
  z-index: 10;

  & > div {
    width: 100%;
    height: 2px;
    background-color: ${({ theme }) => theme.colors.defaultText};
    margin-bottom: 3px;
  }
`

export default props => (
  <StyledHamburger {...props}>
    <div />
    <div />
    <div />
  </StyledHamburger>
)
