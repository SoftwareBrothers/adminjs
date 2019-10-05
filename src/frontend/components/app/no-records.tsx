import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../backend/utils/view-helpers'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'

type Props = {
  resource: ResourceJSON;
}

const NoRecords: React.FC<Props> = (props) => {
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
            <span>Create </span>
            <Link to={newAction}>first record</Link>
          </React.Fragment>
        ) : ''}
      </p>
    </div>
  )
}

export default NoRecords
