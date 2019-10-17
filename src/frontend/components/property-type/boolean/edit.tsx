import React, { ReactNode } from 'react'

import PropertyInEdit from '../../ui/property-in-edit'
import { PropertyProps } from '../base-property-props'

export default class Edit extends React.PureComponent<PropertyProps> {
  handleChange(event): void {
    const { property, onChange } = this.props
    const { checked } = event.target
    onChange(property.name, checked)
  }

  render(): ReactNode {
    const { property, record } = this.props
    const value = (record.params && record.params[property.name]) || ''
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        <input
          type="checkbox"
          className="checkbox"
          id={property.name}
          name={property.name}
          onChange={this.handleChange.bind(this)}
          checked={value}
        />
      </PropertyInEdit>
    )
  }
}
