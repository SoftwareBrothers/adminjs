import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import { connect } from 'react-redux'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import { propertyType, recordType, resourceType } from '../../../types'

const ReferenceValue = (props) => {
  const { resources, property, record } = props

  const h = new ViewHelpers()
  const refId = record.params[property.name]
  const populated = record.populated[property.name]
  const value = (populated && populated.title) || refId

  const referenceResource = resources.find(r => r.id === property.reference)

  if (referenceResource.recordActions.find(a => a.name === 'show') && populated) {
    const href = h.recordActionUrl({
      resourceId: property.reference, recordId: refId, actionName: 'show',
    })
    return (
      <Link to={href}>{value}</Link>
    )
  }
  return (
    <span>{value}</span>
  )
}

const mapStateToProps = state => ({
  resources: state.resources,
})

ReferenceValue.propTypes = {
  property: propertyType.isRequired,
  record: recordType.isRequired,
  resources: PropTypes.arrayOf(resourceType).isRequired,
}

export default connect(mapStateToProps)(ReferenceValue)
