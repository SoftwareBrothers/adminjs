/* eslint-disable jsx-a11y/label-has-for */
import React from 'react'
import PropTypes from 'prop-types'

import { simplifiedPropertyType, recordType } from '../../../types'

const toolbarOptions = [
  [{ header: [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'], // toggled buttons
  ['blockquote', 'code-block'],
  [{ list: 'ordered' }, { list: 'bullet' }],
  [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
  [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
  [{ direction: 'rtl' }], // text direction

  [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown

  [{ color: [] }, { background: [] }], // dropdown with defaults from theme
  [{ font: [] }],
  [{ align: [] }],

  ['clean'], // remove formatting button
]

export default class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.wysiwigRef = React.createRef()
  }

  componentDidMount() {
    this.setupWysiwig()
  }

  shouldComponentUpdate() {
    return false
  }

  componentDidUpdate() {
    this.setupWysiwig()
  }

  setupWysiwig() {
    const { property, record } = this.props
    const value = (record.params && record.params[property.name]) || ''
    this.wysiwigRef.current.innerHTML = value
    const quill = new Quill(this.wysiwigRef.current, {
      modules: {
        toolbar: toolbarOptions,
      },
      theme: 'snow',
    })

    quill.on('text-change', () => {
      this.handleChange(this.wysiwigRef.current.children[0].innerHTML)
    })
  }

  handleChange(value) {
    const { onChange, property } = this.props
    onChange(property.name, value)
  }

  render() {
    const { property, record } = this.props
    const error = record.errors && record.errors[property.name]
    return (
      <div className="field">
        <label
          htmlFor={property.name}
          className="label"
        >
          {property.label}
        </label>
        <div className="control has-icons-right">
          <div className="quill-editor" ref={this.wysiwigRef} style={{ height: '400px' }} />
        </div>
        {error && (
          <div className="help is-danger">{error.message}</div>
        )}
      </div>
    )
  }
}

Edit.propTypes = {
  property: simplifiedPropertyType.isRequired,
  record: recordType.isRequired,
  onChange: PropTypes.func.isRequired,
}
