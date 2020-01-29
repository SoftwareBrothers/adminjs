import React from 'react'
import styled from 'styled-components'
import { space, SpaceProps } from 'styled-system'
import * as CarbonIcons from '@carbon/icons-react'


export type IconProps = SpaceProps & {
  icon?: string;
  size?: 16 | 20 | 24 | 32;
  color?: string;
}

const Wrapper = styled.span<IconProps>`
  vertical-align: middle;
  display: inline-block;
  
  & > svg {
    ${({ theme, color }): string => (color ? `fill: ${theme.colors[color]}` : '')};
  }

  ${space};
`

export const Icon: React.FC<IconProps> = (props) => {
  const { icon, size, ...other } = props
  const iconSize = size || 16
  const CarbonIcon = CarbonIcons[`${icon}${iconSize}`] || CarbonIcons.ErrorOutline16

  if (CarbonIcon) {
    return (
      <Wrapper {...other}><CarbonIcon /></Wrapper>
    )
  }
  return null
}
