import React from 'react'
import styled from 'styled-components'
import { typography, TypographyProps, space, SpaceProps } from 'styled-system'
import { Button } from './button'
import { cssClass } from '../utils/css-class'

/**
 * Prop Types of an Header components.
 * Apart from all props for a standard hx elements it extends
 * {@link TypographyProps} and {@link SpaceProps}
 *
 * @memberof Header
 * @alias HeaderProps
 * @property {string} [...] Other props from {@link TypographyProps}, {@link SpaceProps}
 */
export type HeaderProps = TypographyProps & SpaceProps

const Base = styled.h3<HeaderProps>`
  font-family: ${({ theme }): string => theme.font};
  vertical-align: middle;
  margin: ${({ theme }): string => theme.space.default} 0;
  padding: 0;
  * {
    vertical-align: middle;
  }
  & ${Button}, a {
    vertical-align: bottom;
  }
  ${typography};
  ${space};
`

Base.defaultProps = {
  fontWeight: 'normal',
  fontSize: 'h3',
  lineHeight: 'xl',
  className: cssClass(['Header', 'H3']),
}

const H1 = styled(props => <Base as="h1" {...props} />)``
H1.defaultProps = {
  fontSize: 'h1',
  lineHeight: 'xxl',
  className: cssClass(['Header', 'H1']),
}

const H2 = styled(props => <Base as="h2" {...props} />)`
  & ${Button}, a {
    margin-bottom: 4px;
  }
`
H2.defaultProps = {
  fontSize: 'h2',
  lineHeight: 'xxl',
  className: cssClass(['Header', 'H2']),
}

const H3 = Base

const H4 = styled(props => <Base as="h4" {...props} />)``
H4.defaultProps = {
  fontSize: 'h4',
  lineHeight: 'xl',
  className: cssClass(['Header', 'H4']),
}

const H5 = styled(props => <Base as="h5" {...props} />)``
H5.defaultProps = {
  fontSize: 'xl',
  lineHeight: 'lg',
  className: cssClass(['Header', 'H5']),
}

const H6 = styled(props => <Base as="h6" {...props} />)``
H6.defaultProps = {
  fontSize: 'lg',
  lineHeight: 'lg',
  className: cssClass(['Header', 'H6']),
}

/**
 *
 * The Header component is a base for all text components intended as headings.
 *
 * Usage
 * ```javascript
 * import { H1, H2, H3, H4, H5, H6, HeaderProps } from 'admin-bro'
 *
 * // or
 *
 * import { Header } from 'admin-bro'
 * // Header.H1
 * ```
 * By default, the Heading component renders an __h3__ element.
 *
 * @component
 * @subcategory Atoms
 * @example
 * return (
 * <Box py="lg">
 *   <Header.H1>H1 Header - 40</Header.H1>
 *   <Text variant="sm" mb={5}>Roboto 40 - line height - 40</Text>
 *   <Header.H2>H2 Header - 32</Header.H2>
 *   <Text variant="sm" mb={5}>Roboto 32 - line height - 40</Text>
 *   <Header.H3>H3 Header - 28</Header.H3>
 *   <Text variant="sm" mb={5}>Roboto 28 - line height - 32</Text>
 *   <Header.H4>H4 Header - 24</Header.H4>
 *   <Text variant="sm" mb={5}>Roboto 24 - line height - 32</Text>
 *   <Header.H5>H5 Header - 18</Header.H5>
 *   <Text variant="sm" mb={5}>Roboto 18 - line height - 24</Text>
 *   <Header.H6>H6 Header - 16</Header.H6>
 *   <Text variant="sm" mb={5}>Roboto 16 - line height - 24</Text>
 * </Box>
 * )
 *
 *
 */
const Header = H3 as any

Header.H1 = H1
Header.H2 = H2
Header.H3 = H3
Header.H4 = H4
Header.H5 = H5
Header.H6 = H6

export {
  Header as default,
  Header,
  H1,
  H2,
  H3,
  H4,
  H5,
  H6,
}
