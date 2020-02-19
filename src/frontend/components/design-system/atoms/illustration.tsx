import React from 'react'
import { ThemeProps, DefaultTheme, withTheme } from 'styled-components'
import * as Illustrations from './illustrations'
import { Props } from './illustrations/props.type'

export type IllustrationProps = Omit<Props, 'theme'> & {
  variant: 'Moon' | 'Rocket' | 'Astronaut'
    | 'DocumentCheck' | 'DocumentSearch' | 'FileSearch'
    | 'FlagInCog' | 'Folders' | 'Launch' | 'Planet'
    | 'AdminBroLogo' | 'SoftwareBrothersLogo' | 'GithubLogo';
}

const RawIllustration: React.FC<IllustrationProps & ThemeProps<DefaultTheme>> = (props) => {
  const { variant, ...other } = props
  const IllustrationComponent = Illustrations[variant]
  return (
    <IllustrationComponent {...other} />
  )
}

export const Illustration = withTheme(RawIllustration)

export default Illustration
