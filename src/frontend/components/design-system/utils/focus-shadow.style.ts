import { parseToRgb } from 'polished'
import { DefaultTheme } from 'styled-components'

export default (theme: DefaultTheme): string => {
  const rgb = parseToRgb(theme.colors.accent)
  const color = `rgba(${rgb.red}, ${rgb.green}, ${rgb.blue}, .58)`
  return `0 1px 4px 0 ${color};`
}
