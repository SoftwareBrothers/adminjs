import React from 'react'

const toolbarOptions = [
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],
  [{ 'list': 'ordered'}, { 'list': 'bullet' }],
  [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean']                                         // remove formatting button
];

export default class Edit extends React.Component {
  handleChange(value) {
    this.props.onChange(this.props.property.name, value)
  }

  setupWysiwig() {
    const quill = new Quill(this.refs.wysiwig, {
      modules: {
        toolbar: toolbarOptions
      },
      theme: 'snow'
    })

    quill.on('text-change', () => {
      this.handleChange(this.refs.wysiwig.children[0].innerHTML)
    })
  }

  componentDidMount() {
    this.setupWysiwig()
  }

  shouldComponentUpdate(nextProps, nextState) {
    return false
  }

  componentDidUpdate() {
    this.setupWysiwig()
  }

  render() {
    const { property, resource, record } = this.props
    const value = (record.params && record.params[property.name]) || ''
    const error = record.errors && record.errors[property.name]
    return (
      <div className="field">
        <label htmlFor={property.name} className="label">{property.label}</label>
        <div className="control has-icons-right">
          <div className="quill-editor" ref="wysiwig" style={{height: "400px"}}>
            {value}
          </div>
        </div>
        {error && (
          <div className="help is-danger">{error.message}</div>
        )}
      </div>
    )
  }
}
