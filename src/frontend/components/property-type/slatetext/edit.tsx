import { FormGroup, FormMessage } from '@adminjs/design-system'
import React, { FC, memo, useCallback } from 'react'
import { EditorContent, useEditor, EditorEvents } from '@tiptap/react'
import StarterKit from '@tiptap/starter-kit'
import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import { PropertyLabel } from '../utils/property-label'

const Edit: FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params?.[property.path] || ''
  const error = record.errors && record.errors[property.path]

  const handleUpdate = useCallback(({ editor }: EditorEvents['update']) => {
    onChange(property.path, editor.getHTML())
  }, [])

  const editor = useEditor({
    extensions: [StarterKit],
    content: value,
    onUpdate: handleUpdate,
  })

  return (
    <FormGroup error={Boolean(error)}>
      <PropertyLabel property={property} />
      <EditorContent editor={editor} />
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

export default memo(Edit, recordPropertyIsEqual)
