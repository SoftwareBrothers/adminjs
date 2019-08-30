import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../backend/utils/view-helpers'
import { resourceType } from '../../types'

const NoRecords = (props) => {
  const { resource } = props
  const canCreate = resource.resourceActions.find(a => a.name === 'new')
  const h = new ViewHelpers()
  const newAction = h.resourceActionUrl({ resourceId: resource.id, actionName: 'new' })

  return (
    <div className="content has-text-centered">
      <h3>No records</h3>
      <p>
        There are no records in this resource.
        {canCreate ? (
          <React.Fragment>
            {'Create '}
            <Link to={newAction}>first record</Link>
          </React.Fragment>
        ) : ''}
      </p>
    </div>
  )
}

NoRecords.propTypes = {
  resource: resourceType.isRequired,
}

export default NoRecords
