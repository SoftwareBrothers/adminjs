import React from 'react'
import PropertyType from '../property-type'

export default class New extends React.Component {
  handleSubmit(event){
    console.log('submit')
    event.preventDefault()
    return false
  }
  render() {
    const resource = this.props.resource
    const properties = this.props.resource.editProperties
    const record = {}
    return (
      <div className="column">
        <div className="border-box">
          <form onSubmit={this.handleSubmit}>
            {properties.map(property => (
              <PropertyType
                where="edit"
                property={property}
                resource={resource}
                record={record} />
            ))}
            <div className="field is-grouped"></div>
              <div className="control">
                <button className="button is-primary" type='submit'>
                  <span className="icon is-small"><i className="icomoon-save"></i></span>
                  <div className="btn-text">Save</div>
                </button>
              </div>
          </form>
        </div>
      </div>
    )
  }
}