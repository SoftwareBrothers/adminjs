/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DefaultTheme } from 'styled-components'

const selectStyles = (theme: DefaultTheme) => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.border}`,
    borderRadius: '0px',
    background: theme.colors.inputBck,
    color: theme.colors.defaultText,
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: theme.colors.border,
    background: theme.colors.bck,
  }),
  input: () => ({
    color: theme.colors.defaultText,
    background: theme.colors.inputBck,
  }),
  singleValue: () => ({
    color: theme.colors.defaultText,
  }),
  option: (provided, state) => {
    let color = state.isSelected ? theme.colors.defaultText : theme.colors.lightText
    if (state.isFocused) {
      color = theme.colors.inputBck
    }
    return {
      ...provided,
      color,
      background: state.isFocused
        ? theme.colors.primary
        : 'transparent',
    }
  },
})

const filterStyles = theme => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.borderOnDark}`,
    borderRadius: '0px',
    background: 'transparent',
    color: theme.colors.filterDefaultText,
  }),
  input: () => ({
    color: theme.colors.filterDefaultText,
  }),
  singleValue: () => ({
    color: theme.colors.filterDefaultText,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? theme.colors.filterDefaultText : theme.colors.filterLightText,
    background: state.isFocused ? 'rgba(32,39,62,0.25)' : 'transparent',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: theme.colors.border,
    background: theme.colors.darkBck,
    zIndex: 5,
  }),
})

export { filterStyles }

export default selectStyles
