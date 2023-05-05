import React, { MouseEvent, useCallback } from 'react'
import { Button, Section, FormGroup, FormMessage, Icon, Box } from '@adminjs/design-system'
import { DragDropContext, Droppable, Draggable, DropResult } from '@hello-pangea/dnd'

import AddNewItemButton from './add-new-item-translation.js'
import { flat } from '../../../../utils/index.js'
import { EditPropertyPropsInArray } from '../base-property-props.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import { convertToSubProperty } from './convert-to-sub-property.js'
import { PropertyJSON } from '../../../interfaces/index.js'
import { removeSubProperty } from './remove-sub-property.js'
import allowOverride from '../../../hoc/allow-override.js'

type EditProps = Required<EditPropertyPropsInArray>

type ItemRendererProps = {
  onDelete: (event: MouseEvent, property: PropertyJSON) => boolean;
  index: number;
  isDraggable: boolean;
}

const ItemRenderer: React.FC<EditProps & ItemRendererProps> = (props) => {
  const { ItemComponent, property, onDelete, index, record, isDraggable } = props
  const uniqueDraggableId = window.btoa(unescape(encodeURIComponent(`${JSON.stringify(flat.get(record.params, property.path))}-${property.path}`)))

  return (
    <Draggable
      draggableId={uniqueDraggableId}
      index={index}
      key={uniqueDraggableId}
      isDragDisabled={!isDraggable}
    >
      {(provided): JSX.Element => (
        <Box
          as="div"
          ref={provided.innerRef}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          backgroundColor="white"
          flex
          flexDirection="row"
          alignItems="start"
          variant="transparent"
          data-testid={property.path}
        >
          <Box as="div" flexGrow={1}>
            <ItemComponent {...props} />
          </Box>
          <Button
            rounded
            mt="xl"
            ml="default"
            data-testid="delete-item"
            type="button"
            size="icon"
            onClick={(event): boolean => onDelete(event, property)}
            variant="text"
            color="danger"
          >
            <Icon icon="Trash2" />
          </Button>
        </Box>
      )}
    </Draggable>
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

  const handleOnDragEnd = useCallback((result: DropResult): void => {
    const { source, destination } = result

    if (!source || !destination || destination.index === source.index) return

    const itemsCopy = Array.from(items)
    const [sourceItem] = itemsCopy.splice(source.index, 1)
    itemsCopy.splice(destination.index, 0, sourceItem)

    onChange(property.path, itemsCopy)
  }, [record, onChange, property])

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId={property.path}>
        {(provided): JSX.Element => (
          <Section
            ref={provided.innerRef}
            {...provided.droppableProps}
            mt="xl"
            className={property.path}
          >
            {items.map((item, i) => {
              const itemProperty = convertToSubProperty(property, i)
              return (
                <ItemRenderer
                  {...props}
                  property={itemProperty}
                  isDraggable={property.isDraggable}
                  key={itemProperty.path}
                  onDelete={removeItem}
                  index={i}
                />
              )
            })}
            {provided.placeholder}
            <AddNewItemButton resource={resource} property={property} onClick={addNew} data-testid={`${property.path}-add`} />
          </Section>
        )}
      </Droppable>
    </DragDropContext>
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

const OverridableEdit = allowOverride(Edit, 'DefaultArrayEditProperty')

export {
  OverridableEdit as default,
  OverridableEdit as Edit,
}
