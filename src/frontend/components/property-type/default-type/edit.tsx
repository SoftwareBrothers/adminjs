import React, { ReactNode } from 'react'
import Select from 'react-select'
import { withTheme, DefaultTheme } from 'styled-components'

import { EditPropertyProps } from '../base-property-props'
import selectStyles from '../../../styles/select-styles'
import { Input, FormMessage, FormGroup, Label } from '../../design-system'
import { recordPropertyIsEqual } from '../record-property-is-equal'

type CombinedProps = EditPropertyProps & {theme: DefaultTheme}

class Edit extends React.Component<CombinedProps> {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
    this.handleSelectChange = this.handleSelectChange.bind(this)
  }

  shouldComponentUpdate(prevProps: CombinedProps): boolean {
    return !recordPropertyIsEqual(prevProps, this.props)
  }

  handleInputChange(event): void {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  handleSelectChange(selected): void {
    const { onChange, property } = this.props
    const value = selected ? selected.value : ''
    onChange(property.name, value)
  }

  renderInput(): ReactNode {
    const { property, record, theme } = this.props
    const value = (record.params && typeof record.params[property.name] !== 'undefined')
      ? record.params[property.name]
      : ''
    if (property.availableValues) {
      const styles = selectStyles(theme)
      const selected = property.availableValues.find(av => av.value === value)
      return (
        <Select
          isClearable
          styles={styles}
          value={selected}
          options={property.availableValues}
          onChange={this.handleSelectChange}
          isDisabled={property.isDisabled}
        />
      )
    }
    return (
      <Input
        id={property.name}
        name={property.name}
        onChange={this.handleInputChange}
        value={value}
        disabled={property.isDisabled}
      />
    )
  }

  render(): ReactNode {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <FormGroup error={!!error}>
        <Label
          htmlFor={property.name}
          required={property.isRequired}
        >
          {property.label}
        </Label>
        {this.renderInput()}
        <FormMessage>{error && error.message}</FormMessage>
      </FormGroup>
    )
  }
}

export default withTheme(Edit)
