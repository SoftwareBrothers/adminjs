/* eslint-disable @typescript-eslint/explicit-function-return-type */
import { DefaultTheme } from 'styled-components'

const selectStyles = (theme: DefaultTheme) => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${theme.colors.bluePrimary}`
      : `1px solid ${theme.colors.greyLight}`,
    borderRadius: '0px',
    background: theme.colors.white,
    color: theme.colors.darkGrey,
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: theme.colors.greyPale,
    background: theme.colors.white,
  }),
  input: () => ({
    color: theme.colors.darkGrey,
    background: theme.colors.white,
  }),
  singleValue: () => ({
    color: theme.colors.darkGrey,
  }),
  option: (provided, state) => {
    let color = state.isSelected ? theme.colors.darkGrey : theme.colors.grey
    if (state.isFocused) {
      color = theme.colors.white
    }
    return {
      ...provided,
      color,
      background: state.isFocused
        ? theme.colors.bluePrimary
        : 'transparent',
    }
  },
})

const filterStyles = theme => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${theme.colors.bluePrimary}`
      : `1px solid ${theme.colors.greyPale}`,
    borderRadius: '0px',
    background: 'transparent',
    color: theme.colors.white,
  }),
  input: () => ({
    color: theme.colors.white,
  }),
  singleValue: () => ({
    color: theme.colors.white,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? theme.colors.white : theme.colors.greyPale,
    background: state.isFocused ? 'rgba(32,39,62,0.25)' : 'transparent',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: theme.colors.greyPale,
    background: theme.colors.blueFilter,
    zIndex: 5,
  }),
})

export { filterStyles }

export default selectStyles
