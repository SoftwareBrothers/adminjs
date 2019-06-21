import { colors } from './variables'

const selectStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${colors.primary}`
      : `1px solid ${colors.border}`,
    borderRadius: '0px',
    background: 'transparent',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: colors.border,
  }),
}

const filterStyles = {
  control: (provided, state) => ({
    ...provided,
    border: state.isFocused
      ? `1px solid ${colors.primary}`
      : `1px solid ${colors.borderOnDark}`,
    borderRadius: '0px',
    background: 'transparent',
    color: colors.lightText,
  }),
  input: () => ({
    color: '#fff',
  }),
  singleValue: () => ({
    color: colors.lightText,
  }),
  option: (provided, state) => ({
    ...provided,
    color: state.isSelected ? '#ffffff' : colors.lightText,
    background: state.isFocused ? 'rgba(32,39,62,0.25)' : 'transparent',
  }),
  menu: provided => ({
    ...provided,
    borderRadius: '0px',
    borderColor: colors.border,
    background: colors.darkBck,
    zIndex: 5,
  }),
}

export { filterStyles }

export default selectStyles
