import { FormGroup, FormMessage, RichTextEditor, TinyMCE } from '@adminjs/design-system'
import React, { FC, memo, useCallback } from 'react'

import { EditPropertyProps } from '../base-property-props.js'
import { recordPropertyIsEqual } from '../record-property-is-equal.js'
import { PropertyLabel } from '../utils/property-label/index.js'
import allowOverride from '../../../hoc/allow-override.js'

const Edit: FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params?.[property.path]
  const error = record.errors && record.errors[property.path]
  const { custom = {} } = property
  const { variant = 'default' } = custom

  const handleUpdate = useCallback((newValue: string) => {
    onChange(property.path, newValue)
  }, [])

  if (variant === 'tinymce') {
    return (
      <FormGroup error={Boolean(error)}>
        <PropertyLabel property={property} />
        <TinyMCE value={value} onChange={handleUpdate} options={property.props} />
        <FormMessage>{error?.message}</FormMessage>
      </FormGroup>
    )
  }

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <RichTextEditor value={value} onChange={handleUpdate} options={property.props} />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default allowOverride(memo(Edit, recordPropertyIsEqual), 'DefaultRichtextEditProperty')
