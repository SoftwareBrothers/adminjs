import React from 'react'
import styled from 'styled-components'
import { typography, TypographyProps, space, SpaceProps } from 'styled-system'
import { Button } from './button'

const Base = styled.h3<TypographyProps & SpaceProps>`
  font-family: ${({ theme }): string => theme.font};
  vertical-align: middle;
  margin: ${({ theme }): string => theme.space.default} 0;
  padding: 0;
  * {
    vertical-align: middle;
  }
  ${Button} {
    vertical-align: bottom;
  }
  ${typography};
  ${space};
`

Base.defaultProps = {
  fontWeight: 'normal',
  fontSize: 'h3',
  lineHeight: 'xl',
}

const H1 = styled(props => <Base as="h1" {...props} />)``
H1.defaultProps = {
  fontSize: 'h1',
  lineHeight: 'xxl',
}

const H2 = styled(props => <Base as="h2" {...props} />)``
H2.defaultProps = {
  fontSize: 'h2',
  lineHeight: 'xxl',
}

const H3 = Base

const H4 = styled(props => <Base as="h4" {...props} />)``
H4.defaultProps = {
  fontSize: 'h4',
  lineHeight: 'xl',
}

const H5 = styled(props => <Base as="h5" {...props} />)``
H5.defaultProps = {
  fontSize: 'xl',
  lineHeight: 'lg',
}

const H6 = styled(props => <Base as="h6" {...props} />)``
H6.defaultProps = {
  fontSize: 'lg',
  lineHeight: 'lg',
}

export { H1, H2, H3, H4, H5, H6 }
