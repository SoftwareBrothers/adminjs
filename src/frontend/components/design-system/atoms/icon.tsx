import React from 'react'
import styled from 'styled-components'
import { space, SpaceProps, color, ColorProps } from 'styled-system'
import * as CarbonIcons from '@carbon/icons-react'


export type IconProps = SpaceProps & ColorProps & {
  icon?: string;
  size?: 16 | 20 | 24 | 32;
  color?: string;
  bg: string;
  rounded?: boolean;
}

const Wrapper = styled.span<IconProps>`
  vertical-align: middle;
  display: inline-block;
  line-height: ${({ theme }): string => theme.lineHeights.sm};
  font-size: ${({ theme }): string => theme.fontSizes.sm};
  
  & > svg {
    ${({ theme, color }): string => (color ? `fill: ${theme.colors[color]}` : '')};
  }
  ${({ rounded }): string => (rounded ? 'border-radius: 9999px;' : '')};

  ${space};
  ${color};
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
