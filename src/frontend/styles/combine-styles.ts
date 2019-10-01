import { merge } from 'lodash'
import { DefaultTheme } from 'styled-components'

import * as variables from './variables'

const combineStyles = (newTheme): DefaultTheme => merge(variables, newTheme)

export default combineStyles
