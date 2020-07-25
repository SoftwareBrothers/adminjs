import { merge } from 'lodash'
import { theme, DefaultTheme as Theme } from '@admin-bro/design-system'

const combineStyles = (newTheme: Partial<Theme>): Theme => {
  const merged = merge(theme, newTheme)
  if (newTheme.font) {
    return {
      ...merged,
      font: newTheme.font,
    }
  }
  return merged
}

export default combineStyles
