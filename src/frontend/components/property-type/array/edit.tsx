import React, { ReactNode, MouseEvent } from 'react'
import { Button, Section, FormGroup, FormMessage, Label, Icon, Box } from '@admin-bro/design-system'

import { RecordJSON } from '../../../interfaces'
import AddNewItemButton from './add-new-item-translation'
import { flat } from '../../../../utils'
import { EditPropertyProps } from '../base-property-props'
import { PropertyLabel } from '../../app/property-label'

type Props = EditPropertyProps & {
  onChange: (record: RecordJSON) => any;
  ItemComponent: typeof React.Component;
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
            path: `${property.path}.${i}`,
            label: `[${i + 1}]`,
            isArray: false,
          }}
        />
      </Box>
      <Box flexShrink={0} ml="lg">
        <Button
          rounded
          ml="default"
          data-testid="delete-item"
          type="button"
          size="icon"
          onClick={(event): false => onDelete(event)}
          variant="danger"
        >
          <Icon icon="TrashCan" />
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
    const items = [
      ...(flat.get(record.params, property.path) || []),
      property.subProperties.length ? {} : '',
    ]
    onChange(property.path, items)
    event.preventDefault()
    return false
  }

  removeItem(i, event: MouseEvent): false {
    const { property, record, onChange } = this.props
    const items = flat.get(record.params, property.path)
    const newItems = [...items]
    newItems.splice(i, 1)
    onChange(property.path, newItems)
    event.preventDefault()
    return false
  }

  renderInput(): ReactNode {
    const { property, record, resource } = this.props
    const items = flat.get(record.params, property.path) || []
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
        <Button onClick={this.addNew} type="button" rounded>
          <AddNewItemButton resource={resource} property={property} />
        </Button>
      </Section>
    )
  }

  render(): ReactNode {
    const { property, record, testId } = this.props
    const error = record.errors && record.errors[property.path]
    return (
      <FormGroup error={!!error} data-testid={testId}>
        <PropertyLabel property={property} />
        {this.renderInput()}
        <FormMessage>{error && error.message}</FormMessage>
      </FormGroup>
    )
  }
}
