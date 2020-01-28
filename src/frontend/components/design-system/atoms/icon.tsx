import React from 'react'
import styled, { css } from 'styled-components'
import { compose, space, SpaceProps } from 'styled-system'
import * as CarbonIcons from '@carbon/icons-react'

export type IconProps = SpaceProps | {
  icon?: string;
  size?: 16 | 20 | 24 | 32;
}

const defaultCSS = css`
  vertical-align: middle;
`

export const Icon: React.FC<IconProps> = (props) => {
  const { icon, size, ...other } = props
  const iconSize = size || 16
  const CarbonIcon = CarbonIcons[`${icon}${iconSize}`]
  if (CarbonIcon) {
    const StyledCarbonIcon = styled(CarbonIcon)(compose(defaultCSS, space))
    return (
      <StyledCarbonIcon {...other} />
    )
  }
  return null
}
