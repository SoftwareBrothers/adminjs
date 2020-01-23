import React from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'

import styles from './utils/datepicker.styles'
import Input from './input'
import Button from './button'


const StyledDatePicker = styled.div`
  z-index: 2;
  ${styles};
`

const Overlay = styled.div`
  opacity: 0.4;
  background: #ccc;
  display: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
`

const DatePicker: React.FC = (props) => {
  const { id, value, onChange } = props

  return (
    <React.Fragment>
      <Overlay />
      <StyledDatePicker>
        <Input value={value} onChange={onChange} />
        <Button variant="primary">1</Button>
        <ReactDatePicker selected={value} onChange={onChange} inline />
      </StyledDatePicker>
    </React.Fragment>
  )
}

export default DatePicker
