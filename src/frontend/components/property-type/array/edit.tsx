import React, { ReactNode } from 'react'
import * as flat from 'flat'

import PropertyInEdit from '../../ui/property-in-edit'
import StyledLink from '../../ui/styled-link'
import Column from '../../ui/column'
import Columns from '../../ui/columns'
import convertParamsToArrayItems from './convert-params-to-array-items'
import StyledSection from '../../ui/styled-section'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'

type State = {
  items: Array<string>;
}

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  onChange: (record: RecordJSON) => any;
  ItemComponent: typeof React.Component;
}

export default class Edit extends React.Component<Props, State> {
  constructor(props) {
    super(props)
    const { property, record } = this.props
    const items = convertParamsToArrayItems(property, record)

    this.state = { items }
  }

  addNew(): void {
    this.setState(state => ({
      ...state,
      items: [...state.items, ''],
    }))
  }

  removeItem(i): void {
    const { property, record, onChange } = this.props
    const { items } = this.state
    const newItems = [...items]
    newItems.splice(i, 1)

    const newRecord = { ...record }
    newRecord.params = flat.flatten({
      ...flat.unflatten(newRecord.params),
      [property.name]: newItems,
    })
    this.setState(state => ({ ...state, items: newItems }))
    onChange(newRecord)
  }

  renderItem(item, i): ReactNode {
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
          <StyledLink style={{ marginTop: 25 }} onClick={(): void => this.removeItem(i)}>
            Remove
          </StyledLink>
        </Column>
      </Columns>
    )
  }

  renderInput(): ReactNode {
    const { items } = this.state
    return (
      <StyledSection style={{ marginTop: 20 }}>
        {items.map((item, i) => this.renderItem(item, i))}
        <p>
          <StyledLink onClick={(): void => this.addNew()}>
            Add new item
          </StyledLink>
        </p>
      </StyledSection>
    )
  }

  render(): ReactNode {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <PropertyInEdit property={property} error={error}>
        {this.renderInput()}
      </PropertyInEdit>
    )
  }
}
