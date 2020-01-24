import React from 'react'
import styled from 'styled-components'
import { typography, TypographyProps, space, SpaceProps } from 'styled-system'

const Base = styled.h3<TypographyProps & SpaceProps>`
  vertical-align: middle;
  * {
    vertical-align: middle;
  }
  ${typography};
  ${space};
`

Base.defaultProps = {
  mt: 3,
  mb: 3,
  p: 0,
  fontWeight: 'normal',
  fontSize: 6,
  lineHeight: 3,
}

const H1 = styled(props => <Base as="h1" {...props} />)``
H1.defaultProps = {
  fontSize: 8,
  lineHeight: 4,
}

const H2 = styled(props => <Base as="h2" {...props} />)``
H2.defaultProps = {
  fontSize: 7,
  lineHeight: 4,
}

const H3 = Base

const H4 = styled(props => <Base as="h4" {...props} />)``
H4.defaultProps = {
  fontSize: 5,
  lineHeight: 3,
}

const H5 = styled(props => <Base as="h5" {...props} />)``
H5.defaultProps = {
  fontSize: 4,
  lineHeight: 2,
}

const H6 = styled(props => <Base as="h6" {...props} />)``
H6.defaultProps = {
  fontSize: 3,
  lineHeight: 2,
}

export { H1, H2, H3, H4, H5, H6 }
