/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import React, { FC, memo } from 'react'
import {
  FormGroup,
  FormMessage,
  RichText,
  QuillOptions,
  DefaultQuillToolbarOptions,
} from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'

type CustomType = {
  borderless?: boolean;
  quill?: QuillOptions;
}

const Edit: FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params?.[property.path] ?? ''
  const error = record.errors && record.errors[property.path]

  const { props: propertyProps } = property

  const { quill = {}, ...customProps } = propertyProps as CustomType || {}
  quill.theme = quill.theme || 'snow'
  quill.modules = {
    toolbar: DefaultQuillToolbarOptions,
    ...(quill.modules || {}),
  }

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <RichText
        {...customProps}
        value={value}
        onChange={content => onChange(property.path, content)}
        quill={quill}
      />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
