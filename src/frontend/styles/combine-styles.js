import { merge } from 'lodash'

import * as variables from './variables'

const combineStyles = newTheme => merge(variables, newTheme)

export default combineStyles
