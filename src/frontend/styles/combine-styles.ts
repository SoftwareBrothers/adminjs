import { merge } from 'lodash'
import { DefaultTheme } from 'styled-components'

import * as variables from './variables'
import { Theme } from '../../admin-bro-options.interface'

const combineStyles = (newTheme: Theme | {}): DefaultTheme => merge(variables, newTheme)

export default combineStyles
