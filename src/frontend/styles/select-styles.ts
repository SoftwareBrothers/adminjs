/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DefaultTheme } from 'styled-components'
import focusShadowStyle from '../components/design-system/utils/focus-shadow.style'

const selectStyles = (theme: DefaultTheme) => ({
  control: (provided, state) => ({
    ...provided,
    borderRadius: '0px',
    borderWidth: '1px',
    background: theme.colors.white,
    color: theme.colors.grey80,
    '&:hover': {
      borderColor: theme.colors.grey60,
    },
    borderColor: state.isFocused ? theme.colors.primary100 : theme.colors.inputBorder,
    boxShadow: state.isFocused ? focusShadowStyle(theme) : 'none',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: theme.colors.grey20,
    background: theme.colors.white,
  }),
  input: () => ({
    color: theme.colors.grey80,
    background: theme.colors.white,
    border: 'none',
  }),
  singleValue: () => ({
    color: theme.colors.grey80,
  }),
  option: (provided, state) => {
    let color = state.isSelected ? theme.colors.grey80 : theme.colors.grey60
    if (state.isFocused) {
      color = theme.colors.white
    }
    return {
      ...provided,
      color,
      background: state.isFocused
        ? theme.colors.primary100
        : 'transparent',
    }
  },
})

const filterStyles = (theme: DefaultTheme) => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${theme.colors.primary100}`
      : `1px solid ${theme.colors.filterInputBorder}`,
    borderRadius: '0px',
    background: 'transparent',
    color: theme.colors.white,
    boxShadow: state.isFocused ? focusShadowStyle(theme) : 'none',
  }),
  input: () => ({
    color: theme.colors.white,
  }),
  singleValue: () => ({
    color: theme.colors.white,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? theme.colors.white : theme.colors.grey20,
    background: state.isFocused ? 'rgba(32,39,62,0.25)' : 'transparent',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: theme.colors.grey20,
    background: theme.colors.filterBg,
    zIndex: 5,
  }),
})

export { filterStyles }

export default selectStyles
