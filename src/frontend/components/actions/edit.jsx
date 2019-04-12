import React from 'react'
import { withRouter } from 'react-router-dom'

import PropertyType from '../property-type'
import { Loader } from '../layout'
import ApiClient from '../../utils/api-client'

class Edit extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      record: { params: {}, populated: {} }
    }
    this.api = new ApiClient()
  }

  handleChange(propertyName, value) {
    this.setState({
      ...this.state,
      record: {
        ...this.state.record,
        params: {
          ...this.state.record.params,
          [propertyName]: value,
        }
      }
    })
  }

  handleSubmit(event){
    this.api.recordAction({
      resourceId: this.props.resource.id,
      actionName: 'edit',
      recordId: this.props.recordId,
      payload: {
        record: this.state.record.params,
      },
    }).then((response) => {
      if (response.data.redirectUrl) {
        this.props.history.push(response.data.redirectUrl)
      } else {
        this.setState({
          ...this.state,
          record: {
            ...this.state.record,
            errors: response.data.record.errors,
          }
        })
      }
    })
    event.preventDefault()
    return false
  }

  componentDidMount() {
    this.api.recordAction({
      resourceId: this.props.resource.id,
      actionName: this.props.action.name,
      recordId: this.props.recordId,
    }).then((response) => {
      this.setState({
        isLoading: false,
        record: response.data.record,
      })
    })
  }

  render() {
    const { resource } = this.props
    const properties = resource.editProperties
    const record = this.state.record

    if (this.state.isLoading) {
      return (
        <Loader />
      )
    }

    return (
      <div className="border-box">
        <form onSubmit={this.handleSubmit.bind(this)}>
          {properties.map(property => (
            <PropertyType
              key={property.name}
              where="edit"
              onChange={this.handleChange.bind(this)}
              property={property}
              resource={resource}
              record={record} />
          ))}
          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary" type='submit'>
                <span className="icon is-small"><i className="icomoon-save"></i></span>
                <div className="btn-text">Save</div>
              </button>
            </div>
          </div>
        </form>
      </div>
    )
  }
}

export default withRouter(Edit)
