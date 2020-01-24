import React from 'react'
import * as CarbonIcons from '@carbon/icons-react'

export type IconProps = {
  icon?: string;
}

export const Icon: React.FC<IconProps> = (props) => {
  const { icon, ...other } = props
  const CarbonIcon = CarbonIcons[`${icon}16`]
  if (CarbonIcon) {
    return (
      <CarbonIcon {...other} />
    )
  }
  return null
}
