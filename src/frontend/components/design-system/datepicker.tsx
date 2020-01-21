import React from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'

import styles from './utils/datepicker.styles'
import { inputStyles } from './input'

const StyledDatePicker = styled.div`
  ${styles};
  .react-datepicker__input-container input {
    ${inputStyles}
    padding: ${({ theme }): string => `${theme.sizes[3]}px`};
  }
`

const DatePicker: React.FC = props => (
  <StyledDatePicker>
    <ReactDatePicker {...props} />
  </StyledDatePicker>
)

export default DatePicker
