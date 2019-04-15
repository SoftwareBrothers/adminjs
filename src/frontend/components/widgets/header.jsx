import React from 'react'
import styled from 'styled-components'
import { sizes } from '../../styles/variables'

const Wrapper = styled.section`
  padding: ${sizes.paddingLayout};
`

const Header = (props) => {
  const { title } = props
  return (
    <Wrapper>
      ala
    </Wrapper>
  )
}

export default Header
