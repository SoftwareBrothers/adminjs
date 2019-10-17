import { merge } from 'lodash'
import { DefaultTheme } from 'styled-components'

import * as variables from './variables'

const combineStyles = (newTheme: {
  colors?: {[key: string]: string};
  sizes?: {[key: string]: string};
  fonts?: {[key: string]: string};
  breakpoints?: {[key: string]: string};
}): DefaultTheme => merge(variables, newTheme)

export default combineStyles
