/* eslint-disable jsx-a11y/label-has-for */
import React, { ReactNode } from 'react'
import { findDOMNode } from 'react-dom'

import styled from 'styled-components'
import { EditPropertyProps } from '../base-property-props'
import { FormGroup, Label, FormMessage } from '../../design-system'

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

export default class Edit extends React.Component<EditPropertyProps> {
  private wysiwigRef: React.RefObject<any>

  private quill: any

  constructor(props: EditPropertyProps) {
    super(props)
    this.wysiwigRef = React.createRef()
  }

  componentDidMount(): void {
    this.setupWysiwig()
  }

  shouldComponentUpdate(nextProps: EditPropertyProps): boolean {
    const { record, property } = this.props
    if (!nextProps) { return false }
    const oldError = record.errors
                     && record.errors[property.name]
                     && record.errors[property.name].message
    const newError = nextProps.record.errors
                     && nextProps.record.errors[property.name]
                     && nextProps.record.errors[property.name].message
    return oldError !== newError
  }

  componentDidUpdate(): void {
    this.setupWysiwig()
  }

  setupWysiwig(): void {
    const { property, record } = this.props
    const value = (record.params && record.params[property.name]) || ''
    this.wysiwigRef.current.innerHTML = value
    if (this.quill) {
      delete this.quill
      // eslint-disable-next-line react/no-find-dom-node
      const thisNode = findDOMNode(this) as Element
      const toolbars = thisNode.getElementsByClassName('ql-toolbar')
      for (let index = 0; index < toolbars.length; index += 1) {
        toolbars[index].remove()
      }
    }
    this.quill = new Quill(this.wysiwigRef.current, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    })

    this.quill.on('text-change', () => {
      this.handleChange(this.wysiwigRef.current.children[0].innerHTML)
    })
  }

  handleChange(value: any): void {
    const { onChange, property } = this.props
    onChange(property.name, value)
  }

  render(): ReactNode {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <FormGroup error={!!error}>
        <Label htmlFor={property.name}>{property.label}</Label>
        <Wrapper>
          <div className="quill-editor" ref={this.wysiwigRef} style={{ height: '400px' }} />
        </Wrapper>
        <FormMessage>{error && error.message}</FormMessage>
      </FormGroup>
    )
  }
}
