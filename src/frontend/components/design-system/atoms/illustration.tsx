import React from 'react'
import { ThemeProps, DefaultTheme, withTheme } from 'styled-components'
import * as Illustrations from './illustrations'

/**
 * @memberof Illustration
 * @alias IllustrationProps
 */
export type IllustrationProps = {
  /**
   * Available illustration variant
   */
  variant: 'Moon' | 'Rocket' | 'Astronaut'
    | 'DocumentCheck' | 'DocumentSearch' | 'FileSearch'
    | 'FlagInCog' | 'Folders' | 'Launch' | 'Planet'
    | 'AdminBroLogo' | 'SoftwareBrothersLogo' | 'GithubLogo';
  /** Optional max width restrictions */
  width?: number;
  /** Optional max height restrictions */
  height?: number;
}

const RawIllustration: React.FC<IllustrationProps & ThemeProps<DefaultTheme>> = (props) => {
  const { variant, ...other } = props
  const IllustrationComponent = Illustrations[variant]
  return (
    <IllustrationComponent {...other} />
  )
}

/**
 * Awesome database with all the illustrations provided with AdminBro.
 *
 * The best thing about them is that they follow your {@link Theme} color palette.
 *
 * @component
 * @subcategory Atoms
 *
 * @example <caption>Folders</caption>
 * return (
 *   <Illustration variant="Folders" />
 * )
 * @example <caption>DocumentSearch</caption>
 * return (
 *   <Illustration variant="DocumentSearch" />
 * )
 * @example <caption>Rocket</caption>
 * return (
 *   <Box bg="grey100" p="xxl"><Illustration variant="Rocket" /></Box>
 * )
 */
export const Illustration = withTheme(RawIllustration)

export default Illustration
