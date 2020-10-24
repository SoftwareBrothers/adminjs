import React, { MouseEvent, useCallback } from 'react'
import { Button, Section, FormGroup, FormMessage, Icon, Box } from '@admin-bro/design-system'

import AddNewItemButton from './add-new-item-translation'
import { flat } from '../../../../utils'
import { EditPropertyPropsInArray } from '../base-property-props'
import { PropertyLabel } from '../utils/property-label'
import { convertToSubProperty } from './convert-to-sub-property'
import { PropertyJSON } from '../../../interfaces'
import { removeSubProperty } from './remove-sub-property'

type EditProps = Required<EditPropertyPropsInArray>

type ItemRendererProps = {
  onDelete: (event: MouseEvent, property: PropertyJSON) => boolean;
}

const ItemRenderer: React.FC<EditProps & ItemRendererProps> = (props) => {
  const { ItemComponent, property, onDelete } = props
  return (
    <Box flex flexDirection="row" alignItems="center" data-testid={property.path}>
      <Box flexGrow={1}>
        <ItemComponent {...props} />
      </Box>
      <Box flexShrink={0} ml="lg">
        <Button
          rounded
          ml="default"
          data-testid="delete-item"
          type="button"
          size="icon"
          onClick={(event): boolean => onDelete(event, property)}
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

  const removeItem = useCallback((event: MouseEvent, subProperty: PropertyJSON): boolean => {
    const newRecord = removeSubProperty(record, subProperty.path)
    onChange(newRecord)
    event.preventDefault()
    return false
  }, [record, onChange, property])

  return (
    <Section mt="xl">
      {items.map((item, i) => {
        const itemProperty = convertToSubProperty(props.property, i)
        return (
          <ItemRenderer
            {...props}
            property={itemProperty}
            key={itemProperty.path}
            onDelete={removeItem}
          />
        )
      })}
      <Button onClick={addNew} type="button" rounded>
        <AddNewItemButton resource={resource} property={property} />
      </Button>
    </Section>
  )
}

const Edit: React.FC<EditProps> = (props) => {
  const { property, record, testId } = props
  const error = record.errors && record.errors[property.propertyPath]

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
