import React from 'react'
import { withTheme, ThemeProps, DefaultTheme } from 'styled-components'


const DesignSystem: React.FC<ThemeProps<DefaultTheme>> = () => (
  <p>design system</p>
)

export default withTheme(DesignSystem)
