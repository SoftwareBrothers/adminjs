import React from 'react'
import PropTypes from 'prop-types'

import PropertyType from '../property-type'
import Loader from '../ui/loader'
import WrapperBox from '../ui/wrapper-box'
import ApiClient from '../../utils/api-client'
import { resourceType, actionType } from '../../types'

/**
 * @name ShowAction
 * @category Actions
 * @description Shows a given record.
 * @component
 */
class Show extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isLoading: true,
      record: { params: {}, populated: {} },
    }
  }

  componentDidMount() {
    const { resource, action, recordId } = this.props
    const api = new ApiClient()
    api.recordAction({
      resourceId: resource.id,
      actionName: action.name,
      recordId,
    }).then((response) => {
      this.setState({
        isLoading: false,
        record: response.data.record,
      })
    })
  }

  render() {
    const { resource } = this.props
    const { record, isLoading } = this.state
    const properties = resource.showProperties

    if (isLoading) {
      return (
        <Loader />
      )
    }

    return (
      <WrapperBox border>
        {properties.map(property => (
          <PropertyType
            key={property.name}
            where="show"
            property={property}
            resource={resource}
            record={record}
          />
        ))}
      </WrapperBox>
    )
  }
}

Show.propTypes = {
  /**
   * Object of type: {@link BaseResource~JSON}
   */
  resource: resourceType.isRequired,
  /**
   * Object of type: {@link Action~JSON}
   */
  action: actionType.isRequired,
  /**
   * Id of a given record
   */
  recordId: PropTypes.string.isRequired,
}

export default Show
