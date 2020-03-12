import { merge } from 'lodash'
import { DefaultTheme } from 'styled-components'

import * as variables from './variables'
import { Theme } from '../../admin-bro-options.interface'

const combineStyles = (newTheme: Partial<Theme>): DefaultTheme => {
  const merged = merge(variables, newTheme)
  if (newTheme.font) {
    return {
      ...merged,
      font: newTheme.font,
    }
  }
  return merged
}

export default combineStyles
