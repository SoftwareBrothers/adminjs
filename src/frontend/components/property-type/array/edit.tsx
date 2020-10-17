import React, { MouseEvent, useCallback } from 'react'
import { Button, Section, FormGroup, FormMessage, Icon, Box } from '@admin-bro/design-system'

import { RecordJSON } from '../../../interfaces'
import AddNewItemButton from './add-new-item-translation'
import { flat } from '../../../../utils'
import { EditPropertyProps } from '../base-property-props'
import { PropertyLabel } from '../utils/property-label'

type EditProps = EditPropertyProps & {
  onChange: (record: RecordJSON) => any;
  ItemComponent: typeof React.Component;
  testId: string;
}

type ItemRendererProps = {
  i: number;
  onDelete: (event: MouseEvent) => boolean;
}

const ItemRenderer: React.FC<EditProps & ItemRendererProps> = (props) => {
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
          onClick={(event): boolean => onDelete(event)}
          variant="danger"
        >
          <Icon icon="TrashCan" />
        </Button>
      </Box>
    </Box>
  )
}

const InputsInSection: React.FC<EditProps> = (props) => {
  const { property, record, resource, onChange } = props
  const items = flat.get(record.params, property.path) || []

  const addNew = useCallback((event: MouseEvent): boolean => {
    const newItems = [
      ...items,
      property.subProperties.length ? {} : '',
    ]
    onChange(property.path, newItems)
    event.preventDefault()
    return false
  }, [record, onChange, property])

  const removeItem = useCallback((i, event: MouseEvent): boolean => {
    const newItems = [...items]
    newItems.splice(i, 1)
    onChange(property.path, newItems)
    event.preventDefault()
    return false
  }, [record, onChange, property])

  return (
    <Section mt="xl">
      {items.map((item, i) => (
        <ItemRenderer
          {...props}
          // eslint-disable-next-line react/no-array-index-key
          key={i}
          i={i}
          onDelete={(event): boolean => removeItem(i, event)}
        />
      ))}
      <Button onClick={addNew} type="button" rounded>
        <AddNewItemButton resource={resource} property={property} />
      </Button>
    </Section>
  )
}

const Edit: React.FC<EditProps> = (props) => {
  const { property, record, testId } = props
  const error = record.errors && record.errors[property.path]

  return (
    <FormGroup error={!!error} data-testid={testId}>
      <PropertyLabel property={property} />
      <InputsInSection {...props} />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export {
  Edit as default,
  Edit,
}
