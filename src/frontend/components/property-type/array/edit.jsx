import React from 'react'
import PropTypes from 'prop-types'
import flat from 'flat'

import PropertyInEdit from '../../ui/property-in-edit'
import StyledButton from '../../ui/styled-button'
import Column from '../../ui/column'
import Columns from '../../ui/columns'
import { simplifiedPropertyType, recordType } from '../../../types'
import convertParamsToArrayItems from './convert-params-to-array-items'
import StyledSection from '../../ui/styled-section'

const { unflatten, flatten } = flat

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    const { property, record } = this.props
    const items = convertParamsToArrayItems(property, record)

    this.state = { items }
  }

  addNew() {
    this.setState(state => ({
      ...state,
      items: [...state.items, ''],
    }))
  }

  removeItem(i) {
    const { property, record, onChange } = this.props
    const { items } = this.state
    const newItems = [...items]
    newItems.splice(i, 1)

    const newRecord = { ...record }
    newRecord.params = flatten({
      ...unflatten(newRecord.params),
      [property.name]: newItems,
    })
    this.setState(state => ({ ...state, items: newItems }))
    onChange(newRecord)
  }

  renderItem(item, i) {
    const { ItemComponent, property } = this.props
    return (
      <Columns key={i}>
        <Column width={10}>
          <ItemComponent
            {...this.props}
            property={{
              ...property,
              name: `${property.name}.${i}`,
              label: `[${i + 1}]`,
              isArray: false,
            }}
          />
        </Column>
        <Column width={2}>
          <StyledButton style={{ marginTop: 25 }} onClick={() => this.removeItem(i)}>
            Remove
          </StyledButton>
        </Column>
      </Columns>
    )
  }

  renderInput() {
    const { items } = this.state
    return (
      <StyledSection style={{ marginTop: 20 }}>
        {items.map((item, i) => this.renderItem(item, i))}
        <p>
          <StyledButton onClick={() => this.addNew()}>
            Add new item
          </StyledButton>
        </p>
      </StyledSection>
    )
  }

  render() {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        {this.renderInput()}
      </PropertyInEdit>
    )
  }
}

Edit.propTypes = {
  property: simplifiedPropertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
  ItemComponent: PropTypes.elementType.isRequired,
}
