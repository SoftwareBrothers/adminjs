import React from 'react'
import styled from 'styled-components'
import { typography, TypographyProps, space, SpaceProps } from 'styled-system'

const Base = styled.h3<TypographyProps & SpaceProps>`
  vertical-align: middle;
  ${space};
  ${typography};

  * {
    vertical-align: middle;
  }
`

Base.defaultProps = { m: 0, p: 0, fontWeight: 'normal', fontSize: 4 }

const H1 = styled(props => <Base as="h1" {...props} />)``
H1.defaultProps = { fontSize: 6 }

const H2 = styled(props => <Base as="h2" {...props} />)``
H2.defaultProps = { fontSize: 5 }

const H3 = Base

const H4 = styled(props => <Base as="h4" {...props} />)``
H4.defaultProps = { fontSize: 3 }

const H5 = styled(props => <Base as="h5" {...props} />)``
H5.defaultProps = { fontSize: 2 }

export { H1, H2, H3, H4, H5 }
