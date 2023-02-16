import React, { useEffect, useState } from 'react'
import { Section, FormGroup, FormMessage, Button, Input, Box, Icon } from '@adminjs/design-system'

import { PropertyJSON } from '../../../interfaces/property-json/index.js'
import { EditPropertyProps } from '../base-property-props.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import { flat } from '../../../../utils/flat/index.js'
import { useTranslation } from '../../../hooks/use-translation.js'
import { RecordError } from '../../../../backend/utils/errors/index.js'

export type EditKeyValuePairProps = {
  onKeyChange: (key: string, newKey: string) => void
  onValueChange: (key: string, newValue: string) => void
  onRemoveItem: (key: string) => void
  objectValue: string
  objectKey: string
  property: PropertyJSON
  error?: RecordError
}

const EditKeyValuePair: React.FC<EditKeyValuePairProps> = (props) => {
  const {
    onKeyChange,
    onValueChange,
    onRemoveItem,
    property,
    objectValue,
    objectKey,
    error,
  } = props
  const { tm } = useTranslation()
  const [currentValue, setValue] = useState(objectValue ?? '')
  const [currentKey, setKey] = useState(objectKey ?? '')

  return (
    <Box flex mb="lg">
      <Box flex justifyContent="space-between" flexGrow={1} flexShrink={0}>
        <FormGroup error={Boolean(error)} mr="lg" mb="0px">
          <Input
            placeholder={tm('keyPlaceholder')}
            onChange={(e) => setKey(e.target.value)}
            onBlur={() => onKeyChange(objectKey, currentKey)}
            onKeyDown={(e) => e.keyCode === 13 && onKeyChange(objectKey, currentKey)}
            value={currentKey}
            {...(property.props?.keyInputProps ?? {})}
          />
          {error && <FormMessage>{error.message}</FormMessage>}
        </FormGroup>
        <FormGroup mb="0px">
          <Input
            placeholder={tm('valuePlaceholder')}
            onChange={(e) => setValue(e.target.value)}
            onBlur={() => onValueChange(currentKey, currentValue)}
            onKeyDown={(e) => e.keyCode === 13 && onValueChange(currentKey, currentValue)}
            value={currentValue}
            disabled={!objectKey}
            {...(property.props?.valueInputProps ?? {})}
          />
        </FormGroup>
      </Box>
      <Button
        rounded
        ml="sm"
        data-testid="delete-item"
        type="button"
        size="icon"
        onClick={() => onRemoveItem(currentKey)}
        variant="contained"
        color="danger"
        flexGrow={0}
        flexShrink={1}
      >
        <Icon icon="Trash2" />
      </Button>
    </Box>
  )
}

const Edit: React.FC<EditPropertyProps> = (props) => {
  const { property, record, onChange, resource } = props
  const { tm, tb } = useTranslation()
  const [objectValue, setObjectValue] = useState<Record<string, string>>(
    flat.get(record.params, property.path) ?? {},
  )

  const handleKeyChange = (oldKey: string, newKey: string) => {
    if (oldKey === newKey) return

    const tmpValue = objectValue[oldKey]

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [oldKey]: _removedKey, ...objectCopy } = objectValue

    objectCopy[newKey] = tmpValue ?? ''

    setObjectValue(parseObjectValue(objectCopy))
  }

  const handleValueChange = (key: string, value: string) => {
    objectValue[key] = value

    setObjectValue(parseObjectValue({ ...objectValue }))
  }

  const parseObjectValue = (obj: Record<string, string>) => Object.entries(obj)
    .reduce((memo, [k, v]) => {
      if (!k || !k.length) return memo
      memo[k] = v
      return memo
    }, {})

  /**
   * This is used to prevent empty/duplicate keys from being added to JSON
   */
  const getNextKey = (previousId?: number) => {
    const nextId = previousId
      ? previousId + 1
      : Object.keys(objectValue ?? {}).length + 1
    const nextKey = `${tm('initialKey', resource.id, { number: nextId })}`

    if (objectValue[nextKey] !== undefined) {
      return getNextKey(nextId)
    }

    return nextKey
  }

  const addNewKeyValuePair = (event) => {
    event.preventDefault()

    const key = getNextKey()

    objectValue[key] = ''

    setObjectValue(parseObjectValue({ ...objectValue }))
  }

  const handleRemoveItem = (key: string) => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { [key]: _removedKey, ...objectCopy } = objectValue

    setObjectValue(parseObjectValue(objectCopy))
  }

  useEffect(() => {
    onChange(property.path, objectValue)
  }, [objectValue])

  const error = record.errors && record.errors[property.path]
  if (property.description === undefined) {
    property.description = tm('keyValuePropertyDefaultDescription', resource.id)
  }

  return (
    <FormGroup error={!!error}>
      <PropertyLabel property={property} />
      <Section {...property.props}>
        {Object.entries(objectValue).map(([key, value]) => (
          <EditKeyValuePair
            key={key}
            property={property}
            objectValue={value}
            objectKey={key}
            onKeyChange={handleKeyChange}
            onValueChange={handleValueChange}
            onRemoveItem={handleRemoveItem}
            error={record.errors[`${property.path}${flat.DELIMITER}${key}`]}
          />
        ))}
        <Button mt="lg" onClick={addNewKeyValuePair}>
          {tb('addNewItem', resource.id)}
        </Button>
      </Section>
      <FormMessage>{error && error.message}</FormMessage>
    </FormGroup>
  )
}

export default Edit
