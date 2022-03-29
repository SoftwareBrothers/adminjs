import { FormGroup, FormMessage, RichTextEditor } from '@adminjs/design-system'
import React, { FC, memo, useCallback } from 'react'
import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'

const Edit: FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params?.[property.path]
  const error = record.errors && record.errors[property.path]

  const handleUpdate = useCallback((newValue: string) => {
    onChange(property.path, newValue)
  }, [])

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <RichTextEditor value={value} onChange={handleUpdate} options={property.props} />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
