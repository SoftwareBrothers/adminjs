import React from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'

import styles from './utils/datepicker.styles'
import Input from './input'


const StyledDatePicker = styled.div`
  ${styles};
`

const DatePicker: React.FC = (props) => {
  const { id, value, onChange } = props

  return (
    <StyledDatePicker>
      <Input value={value} onChange={onChange} />
      <Button variant="primary">1</Button>
      <ReactDatePicker selected={value} onChange={onChange} inline />
    </StyledDatePicker>
  )
}

export default DatePicker
