/* eslint-disable @typescript-eslint/explicit-function-return-type */

const selectStyles = theme => ({
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
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? theme.colors.defaultText : theme.colors.lightText,
    background: state.isFocused ? theme.colors.primary : 'transparent',
  }),
})

const filterStyles = theme => ({
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${theme.colors.primary}`
      : `1px solid ${theme.colors.borderOnDark}`,
    borderRadius: '0px',
    background: 'transparent',
    color: theme.colors.lightText,
  }),
  input: () => ({
    color: '#fff',
  }),
  singleValue: () => ({
    color: theme.colors.lightText,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? theme.colors.filterDefaultText : theme.colors.lightText,
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
