import React, { MouseEvent, useCallback, useMemo, memo, useRef } from 'react'
import { Button, Section, FormGroup, FormMessage, Icon, Box } from '@adminjs/design-system'
import { DropTargetMonitor, useDrag, useDrop } from 'react-dnd'

import AddNewItemButton from './add-new-item-translation'
import { flat } from '../../../../utils'
import { EditPropertyPropsInArray } from '../base-property-props'
import { PropertyLabel } from '../utils/property-label'
import { convertToSubProperty, getIndexFromSubpropertyPath } from './convert-to-sub-property'
import { PropertyJSON } from '../../../interfaces'
import { removeSubProperty } from './remove-sub-property'

const DRAGGABLE_ELEMENT = 'ArrayItem'
const VALUE_PATH_SEPARATOR = '~'

type EditProps = Required<EditPropertyPropsInArray>

type FindItemResult = {
  item: any;
  path: string;
}

type ItemRendererProps = {
  onDelete: (event: MouseEvent, property: PropertyJSON) => boolean;
  moveItem: (id: string, destinationPath: string) => void;
  findItem: (id: string) => FindItemResult;
  isDraggable: boolean;
}

const encodeId = (value: string, path: string) => window.btoa(unescape(encodeURIComponent(`${value}${VALUE_PATH_SEPARATOR}${path}`)))
const decodeId = (id: string) => {
  const decoded = decodeURIComponent(escape(window.atob(id)))

  const [value, path] = decoded.split(VALUE_PATH_SEPARATOR)

  return [JSON.parse(value ?? '{}'), path]
}

const ItemRenderer: React.FC<EditProps & ItemRendererProps> = memo((props) => {
  const ref = useRef<HTMLElement | null>(null)
  const { ItemComponent, property, onDelete, record, findItem, moveItem, isDraggable } = props
  const uniqueDraggableId = encodeId(
    JSON.stringify(flat.get(record.params, property.path)),
    property.path,
  )

  const originalPath = property.path
  const [{ isDragging, handlerId }, connectDrag] = useDrag({
    type: DRAGGABLE_ELEMENT,
    item: { id: uniqueDraggableId, path: originalPath },
    collect: (monitor) => {
      const result = {
        handlerId: monitor.getHandlerId(),
        isDragging: monitor.isDragging(),
      }
      return result
    },
    end: (item, monitor) => {
      const { id: droppedId, path } = item
      if (!monitor.didDrop()) {
        moveItem(droppedId, path)
      } else {
        moveItem(droppedId, monitor.getItem().path)
      }
    },
  }, [moveItem, uniqueDraggableId, originalPath, record])

  const [, connectDrop] = useDrop(
    () => ({
      accept: DRAGGABLE_ELEMENT,
      hover(
        _,
        monitor: DropTargetMonitor<{ id: string; path: string}>,
      ) {
        const sourcePath = monitor.getItem().path
        const sourceIndex = getIndexFromSubpropertyPath(sourcePath)
        const destinationPath = originalPath
        const destinationIndex = getIndexFromSubpropertyPath(destinationPath)

        if (sourceIndex === destinationIndex || !ref.current) {
          return
        }

        const hoverBoundingRect = ref.current.getBoundingClientRect()
        const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2
        const clientOffset = monitor.getClientOffset()
        if (!clientOffset) return

        const hoverClientY = clientOffset.y - hoverBoundingRect.top

        // Dragging downwards
        if (sourceIndex < destinationIndex && hoverClientY < hoverMiddleY) {
          return
        }

        // Dragging upwards
        if (sourceIndex > destinationIndex && hoverClientY > hoverMiddleY) {
          return
        }

        monitor.getItem().path = destinationPath
      },
    }),
    [findItem, moveItem, originalPath, uniqueDraggableId, record],
  )

  if (isDraggable) {
    connectDrag(ref)
    connectDrop(ref)
  }

  const opacity = isDragging ? 0.8 : 1

  return (
    <Box
      ref={ref}
      data-handler-id={handlerId}
      backgroundColor="white"
      flex
      flexDirection="row"
      alignItems="center"
      style={{ opacity }}
      data-testid={property.path}
    >
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
})

const InputsInSection: React.FC<EditProps> = memo((props) => {
  const { property, record, resource, onChange } = props

  const items = useMemo(() => flat.get(record.params, property.path) || [], [record.params])
  const itemProperties = useMemo(
    () => items.map((_, i) => convertToSubProperty(props.property, i)),
    [items],
  )

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

  const findItem = useCallback(
    (id: string): FindItemResult => {
      const [item, path] = decodeId(id)
      return {
        item,
        path,
      }
    },
    [items],
  )

  const moveItem = useCallback(
    (id: string, destinationPath: string) => {
      const { path: sourcePath } = findItem(id)
      const destinationIndex = getIndexFromSubpropertyPath(destinationPath)
      const sourceIndex = getIndexFromSubpropertyPath(sourcePath)

      const itemsCopy = items
      const [sourceItem] = itemsCopy.splice(sourceIndex, 1)
      itemsCopy.splice(destinationIndex, 0, sourceItem)

      onChange(property.path, itemsCopy)
    },
    [findItem, items, onChange],
  )

  return (
    <Section
      my="lg"
      className={property.path}
    >
      {itemProperties.map((itemProperty: PropertyJSON) => (
        <ItemRenderer
          {...props}
          key={itemProperty.path}
          property={itemProperty}
          isDraggable={property.isDraggable}
          onDelete={removeItem}
          moveItem={moveItem}
          findItem={findItem}
        />
      ))}
      <Button onClick={addNew} type="button" rounded>
        <AddNewItemButton resource={resource} property={property} />
      </Button>
    </Section>
  )
})

const Edit: React.FC<EditProps> = memo((props) => {
  const { property, record, testId } = props
  const error = record.errors && record.errors[property.propertyPath]

  return (
    <FormGroup error={!!error} data-testid={testId}>
      <PropertyLabel property={property} />
      <InputsInSection {...props} />
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
})

export {
  Edit as default,
  Edit,
}
