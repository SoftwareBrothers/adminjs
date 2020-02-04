import React from 'react'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import BaseActionComponent from '../app/base-action-component'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../app/error-message'
import { ResourceActionParams } from '../../../backend/utils/view-helpers'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState & RouteComponentProps<ResourceActionParams>

const ResourceAction: React.FC<Props> = (props) => {
  const { resources, match } = props
  const { resourceId, actionName } = match.params

  const resource = resources.find(r => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }
  const action = resource.resourceActions.find(r => r.name === actionName)
  if (!action) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  return (
    <BaseActionComponent
      action={action}
      resource={resource}
    />
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
