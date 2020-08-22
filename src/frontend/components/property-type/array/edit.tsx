import React, { ReactNode, MouseEvent } from 'react'
import flat from 'flat'
import { Button, Section, FormGroup, FormMessage, Label, Icon, Box } from '@admin-bro/design-system'

import convertParamsToArrayItems from './convert-params-to-array-items'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'
import RecordJSON from '../../../../backend/decorators/record-json.interface'
import updateParamsArray from './update-params-array'
import AddNewItemButton from './add-new-item-translation'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'

const { flatten, unflatten } = flat

const normalizeParams = (params: RecordJSON['params']): RecordJSON['params'] => (
  flatten<string, any>(unflatten(params, { overwrite: true }))
)

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  onChange: (record: RecordJSON) => any;
  ItemComponent: typeof React.Component;
  resource: ResourceJSON;
  testId: string;
}

type ItemRendererProps = {
  i: number;
  onDelete: (event: MouseEvent) => false;
}

const ItemRenderer: React.FC<Props & ItemRendererProps> = (props) => {
  const { ItemComponent, property, i, onDelete } = props
  return (
    <Box flex flexDirection="row" alignItems="center" data-testid={`array-item-${i}`}>
      <Box flexGrow={1}>
        <ItemComponent
          {...props}
          property={{
            ...property,
            name: `${property.name}.${i}`,
            label: `[${i + 1}]`,
            isArray: false,
          }}
        />
      </Box>
      <Box flexShrink={0}>
        <Button
          ml="default"
          data-testid="delete-item"
          type="button"
          size="icon"
          onClick={(event): false => onDelete(event)}
          variant="danger"
        >
          <Icon icon="Delete" />
        </Button>
      </Box>
    </Box>
  )
}

export default class Edit extends React.Component<Props> {
  constructor(props) {
    super(props)
    this.addNew = this.addNew.bind(this)
  }

  addNew(event: MouseEvent): false {
    const { property, record, onChange } = this.props
    const items = convertParamsToArrayItems(property, record)
    const newRecord = { ...record }
    newRecord.params = normalizeParams({
      ...newRecord.params, // otherwise yarn types is not working
      [property.name]: [
        ...items,
        property.subProperties.length ? {} : '',
      ],
    })
    onChange(newRecord)
    event.preventDefault()
    return false
  }

  removeItem(i, event: MouseEvent): false {
    const { property, record, onChange } = this.props
    const items = convertParamsToArrayItems(property, record)
    const newItems = [...items]
    newItems.splice(i, 1)
    const newRecord = { ...record }

    newRecord.params = updateParamsArray(
      newRecord.params, property.name, newItems,
    )

    onChange(newRecord)
    event.preventDefault()
    return false
  }

  renderInput(): ReactNode {
    const { property, record, resource } = this.props
    const items = convertParamsToArrayItems(property, record)
    return (
      <Section mt="xl">
        {items.map((item, i) => (
          <ItemRenderer
            {...this.props}
            // eslint-disable-next-line react/no-array-index-key
            key={i}
            i={i}
            onDelete={(event): false => this.removeItem(i, event)}
          />
        ))}
        <Button onClick={this.addNew} type="button" size="sm">
          <AddNewItemButton resource={resource} property={property} />
        </Button>
      </Section>
    )
  }

  render(): ReactNode {
    const { property, record, testId } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <FormGroup error={!!error} data-testid={testId}>
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
