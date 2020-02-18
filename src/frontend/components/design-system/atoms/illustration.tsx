import React from 'react'
import * as Illustrations from './illustrations'
import { Props } from './illustrations/props.type'

export type IllustrationProps = Props & {
  variant: 'Moon' | 'Rocket' | 'Astronaut'
    | 'DocumentCheck' | 'DocumentSearch' | 'FileSearch'
    | 'FlagInCog' | 'Folders' | 'Launch' | 'Planet'
    | 'AdminBroLogo' | 'SoftwareBrothersLogo' | 'GithubLogo';
}

export const Illustration: React.FC<IllustrationProps> = ({ variant, ...other }) => {
  const IllustrationComponent = Illustrations[variant]
  return (
    <IllustrationComponent {...other} />
  )
}

export default Illustration
