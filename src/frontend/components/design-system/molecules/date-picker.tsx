import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'

import { Calendar16 } from '@carbon/icons-react'

import styles from '../utils/datepicker.styles'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'


const StyledDatePicker = styled.div`
  ${styles};
  position: relative;
  display: flex;
  width: 100%;

  & ${Input}, & ${Button} {
    z-index: 101;
  }

  & .react-datepicker {
    border-radius: 0;
    border: 1px solid ${({ theme }): string => theme.colors.bluePrimary};
    padding: ${({ theme }): string => theme.space[3]};
    font-family: ${({ theme }): string => theme.font};
    z-index: 101;
  }

  & .react-datepicker__navigation--next {
    border-left-color: ${({ theme }): string => theme.colors.blueLight};
  }
  & .react-datepicker__navigation--next:hover {
    border-left-color: ${({ theme }): string => theme.colors.bluePrimary};
  }

  & .react-datepicker__navigation--previous {
    border-right-color: ${({ theme }): string => theme.colors.blueLight};
  }
  & .react-datepicker__navigation--previous:hover {
    border-right-color: ${({ theme }): string => theme.colors.bluePrimary};
  }

  & .react-datepicker__navigation {
    outline: none;
    top: 16px;
  }

  & .react-datepicker__header {
    background: ${({ theme }): string => theme.colors.white};
    font-size: ${({ theme }): string => theme.fontSizes[2]};
    border: none;
  }

  & .react-datepicker__current-month {
    font-weight: normal;
    padding-bottom: ${({ theme }): string => theme.space[4]};
  }

  & .react-datepicker__month {
    margin-top: 0;
  }

  & .react-datepicker__day-name {
    color: ${({ theme }): string => theme.colors.blueLight};
  }
  
  & .react-datepicker__day--outside-month {
    color: ${({ theme }): string => theme.colors.greyLight};
  }
  
  & .react-datepicker__day--today {
    color: ${({ theme }): string => theme.colors.bluePrimary};
  }

  & .react-datepicker__day:hover,
  & .react-datepicker__day {
    border-radius: 15px;
  }
  
  & .react-datepicker__day--selected {
    background: ${({ theme }): string => theme.colors.bluePrimary};
    border-radius: 15px;
    color: ${({ theme }): string => theme.colors.white};
  }
`

const Overlay = styled.div`
  opacity: 0;
  background: #ccc;
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 100;
  &.hidden {
    display: none;
  }
`

const DatePickerWrapper = styled.div`
  position: absolute;
  right: 0;
  top: ${({ theme }): string => theme.space[6]};
`

// TODO: change that
export type DatePickerProps = any

export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { selected, onChange, ...other } = props

  const value = selected ? selected.toLocaleString() : ''
  const [hidden, setHidden] = useState(true)

  return (
    <React.Fragment>
      <Overlay
        onClick={(): void => setHidden(true)}
        className={hidden ? 'hidden' : 'visible'}
      />
      <StyledDatePicker>
        <Input
          value={value}
          onChange={onChange}
          onFocus={(): void => setHidden(false)}
        />
        <Button
          variant="primary"
          size="icon"
          onClick={(): void => setHidden(!hidden)}
        >
          <Calendar16 />
        </Button>
        {!hidden ? (
          <DatePickerWrapper>
            <ReactDatePicker selected={selected} onChange={onChange} inline {...other} />
          </DatePickerWrapper>
        ) : ''}
      </StyledDatePicker>
    </React.Fragment>
  )
}
