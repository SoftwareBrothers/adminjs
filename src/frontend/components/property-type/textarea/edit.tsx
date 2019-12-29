import React, { ReactNode } from 'react'
import { withTheme, DefaultTheme } from 'styled-components'

import PropertyInEdit from '../../ui/property-in-edit'
import StyledInput from '../../ui/styled-input'
import { EditPropertyProps } from '../base-property-props'

type CombinedProps = EditPropertyProps & {theme: DefaultTheme}

class Edit extends React.Component<CombinedProps> {
  constructor(props) {
    super(props)
    this.handleInputChange = this.handleInputChange.bind(this)
  }

  handleInputChange(event): void {
    const { onChange, property } = this.props
    onChange(property.name, event.target.value)
  }

  render(): ReactNode {
    const { property, record } = this.props
    const value = (
      record.params
      && typeof record.params[property.name] !== 'undefined'
      && record.params[property.name] !== null
    )
      ? record.params[property.name]
      : ''
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        <StyledInput
          as="textarea"
          className="input"
          rows={(value.match(/\n/g) || []).length + 1}
          id={property.name}
          name={property.name}
          onChange={this.handleInputChange}
          value={value}
          disabled={property.isDisabled}
        />
      </PropertyInEdit>
    )
  }
}

export default withTheme(Edit)
