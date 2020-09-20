/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import React, { FC, memo } from 'react'
import {
  FormGroup,
  Label,
  FormMessage,
  RichText,
  QuillOptions,
  DefaultQuillToolbarOptions,
} from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'


const Edit: FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params?.[property.name] ?? ''
  const error = record.errors && record.errors[property.name]

  const { custom } = property

  const quill = custom as QuillOptions
  quill.theme = quill.theme || 'snow'
  quill.modules = {
    toolbar: DefaultQuillToolbarOptions,
  }

  return (
    <FormGroup error={Boolean(error)}>
      <Label
        htmlFor={property.name}
        required={property.isRequired}
      >
        {property.label}
      </Label>
      <RichText
        value={value}
        onChange={content => onChange(property.name, content)}
        quill={quill}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
