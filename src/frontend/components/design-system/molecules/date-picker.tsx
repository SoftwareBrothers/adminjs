import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'
import styled from 'styled-components'

import styles from '../utils/datepicker.styles'
import { Input } from '../atoms/input'
import { Button } from '../atoms/button'
import { Icon } from '../atoms/icon'
import { InputGroup } from './form-group'
import { cssClass } from '../utils/css-class'


const StyledDatePicker = styled(InputGroup)`
  ${styles};
  position: relative;

  &.active ${Input}, &.active ${Button} {
    z-index: 101;
  }

  & .react-datepicker {
    border-radius: 0;
    border: 1px solid ${({ theme }): string => theme.colors.primary100};
    padding: ${({ theme }): string => theme.space.default};
    font-family: ${({ theme }): string => theme.font};
    z-index: 101;
  }

  & .react-datepicker__navigation--next {
    border-left-color: ${({ theme }): string => theme.colors.primary60};
  }
  & .react-datepicker__navigation--next:hover {
    border-left-color: ${({ theme }): string => theme.colors.primary100};
  }

  & .react-datepicker__navigation--previous {
    border-right-color: ${({ theme }): string => theme.colors.primary60};
  }
  & .react-datepicker__navigation--previous:hover {
    border-right-color: ${({ theme }): string => theme.colors.primary100};
  }

  & .react-datepicker__navigation {
    outline: none;
    top: 16px;
  }

  & .react-datepicker__header {
    background: ${({ theme }): string => theme.colors.white};
    font-size: ${({ theme }): string => theme.fontSizes.default};
    border: none;
  }

  & .react-datepicker__current-month {
    font-weight: normal;
    padding-bottom: ${({ theme }): string => theme.space.lg};
  }

  & .react-datepicker__month {
    margin-top: 0;
  }

  & .react-datepicker__day-name {
    color: ${({ theme }): string => theme.colors.primary60};
  }
  
  & .react-datepicker__day--outside-month {
    color: ${({ theme }): string => theme.colors.grey40};
  }
  
  & .react-datepicker__day--today {
    color: ${({ theme }): string => theme.colors.primary100};
  }

  & .react-datepicker__day:hover,
  & .react-datepicker__day {
    border-radius: 15px;
  }
  
  & .react-datepicker__day--selected {
    background: ${({ theme }): string => theme.colors.primary100};
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
  top: ${({ theme }): string => theme.space.xxl};
`

/**
 * Props for DatePicker
 * @memberof DatePicker
 * @alias DatePickerProps
 */
export type DatePickerProps = {
  /**
   * If datepicker should be disabled
   */
  disabled?: boolean;
  /**
   * selected date
   */
  value?: string | Date;
  /**
   * on change callback taking string as a date
   */
  onChange: (date: string) => void;
}

const pad = (n: number): string => (n < 10 ? `0${n.toString()}` : n.toString())

const format = (date: Date): string => `${date.getFullYear()}-${pad(date.getMonth() + 1)
}-${pad(date.getDate())} ${pad(date.getHours())}:${pad(date.getMinutes())}`

/**
 * Component responsible for showing dates. It is a wrapper to
 * [react datepicker]{@link https://reactdatepicker.com/}.
 *
 * @component
 * @subcategory Molecules
 * @see https://reactdatepicker.com/
 *
 * @example
 * return (
 * <Box width={1/2} height="300px">
 *   <DatePicker onChange={(date) => console.log(date)}/>
 * </Box>
 * )
 */
export const DatePicker: React.FC<DatePickerProps> = (props) => {
  const { value, onChange, disabled, ...other } = props

  const [hidden, setHidden] = useState(true)

  let dateValue: Date | undefined
  let stringValue: string | undefined = value && value.toString()

  if (value && value.constructor.name !== 'Date') {
    const dateNum = Date.parse(value as string) || undefined
    if (dateNum) {
      dateValue = new Date(dateNum)
    }
  } else if (value && value.constructor.name === 'Date') {
    stringValue = format(value as Date)
  }

  const onDatePickerChange = (date: Date): void => {
    if (!disabled) {
      onChange(format(date))
    }
  }

  return (
    <React.Fragment>
      <Overlay
        onClick={(): void => setHidden(true)}
        className={hidden ? 'hidden' : 'visible'}
      />
      <StyledDatePicker className={cssClass('DatePicker', hidden ? 'normal' : 'active')}>
        <Input
          value={stringValue || ''}
          onChange={(event): void => onChange(event.target.value)}
          onFocus={(): void => setHidden(false)}
          disabled={disabled}
        />
        <Button
          variant="primary"
          type="button"
          size="icon"
          disabled={disabled}
          onClick={(): void => setHidden(!hidden)}
        >
          <Icon icon="Calendar" />
        </Button>
        {!hidden ? (
          <DatePickerWrapper>
            <ReactDatePicker selected={dateValue} onChange={onDatePickerChange} inline {...other} />
          </DatePickerWrapper>
        ) : ''}
      </StyledDatePicker>
    </React.Fragment>
  )
}

export default DatePicker
