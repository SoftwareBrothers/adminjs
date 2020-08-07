/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/explicit-function-return-type */
/* eslint-disable no-unused-expressions */
import React, { useRef, useEffect, FC, useState, memo } from 'react'
import styled from 'styled-components'
import { FormGroup, Label, FormMessage } from '@admin-bro/design-system'

import { EditPropertyProps } from '../base-property-props'
import { recordPropertyIsEqual } from '../record-property-is-equal'
import loadQuill from '../../../utils/loadQuill'


const Edit: FC<EditPropertyProps> = (props) => {
  const { property, record, onChange } = props
  const value = record.params?.[property.name] ?? ''
  const error = record.errors && record.errors[property.name]

  const [quill, setQuill] = useState<Quill | null>(null)
  const editorRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    let shouldLoad = true
    loadQuill().then(() => {
      if (!shouldLoad) {
        return
      }
      const quillInstance = new (Quill as any)(editorRef.current, {
        modules: { toolbar: toolbarOptions },
        theme: 'snow',
      })
      setQuill(quillInstance)
    })
    return () => {
      shouldLoad = false
    }
  }, [])

  useEffect(() => {
    if (!editorRef.current || !quill) {
      return
    }
    if (value) {
      quill.root.innerHTML = value
    }
  }, [value, quill])

  useEffect(() => {
    const editor = quill?.root
    if (!editor) {
      return undefined
    }
    const handler = () => {
      const content = editor.innerHTML
      onChange?.(property.name, content)
    }
    editor?.addEventListener('blur', handler)
    return () => {
      editor?.removeEventListener('blur', handler)
    }
  }, [onChange, property.name, quill])

  return (
    <FormGroup error={Boolean(error)}>
      <Label
        htmlFor={property.name}
        required={property.isRequired}
      >
        {property.label}
      </Label>
      <Wrapper>
        <div className="quill-editor" ref={editorRef} style={{ height: '400px' }} />
      </Wrapper>
      <FormMessage>{error?.message}</FormMessage>
    </FormGroup>
  )
}

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]

const Wrapper = styled.div.attrs({
  className: 'control has-icons-right',
})`
  .ql-toolbar {
    border-color: ${({ theme }): string => theme.colors.grey40};

    .ql-picker {
      color: ${({ theme }): string => theme.colors.grey60};
    }
  }

  .ql-container {
    border-color: ${({ theme }): string => theme.colors.grey40};
    background: ${({ theme }): string => theme.colors.white};
  }
`

export default memo(Edit, recordPropertyIsEqual)
