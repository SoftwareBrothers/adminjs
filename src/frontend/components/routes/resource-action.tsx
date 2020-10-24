import React from 'react'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import BaseActionComponent from '../app/base-action-component'
import { ResourceJSON } from '../../interfaces'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../app/error-message'
import { ResourceActionParams } from '../../../backend/utils/view-helpers/view-helpers'
import { ActionHeader } from '../app'
import Wrapper from './utils/wrapper'
import DrawerPortal from '../app/drawer-portal'

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

  if (action.showInDrawer) {
    return (
      <DrawerPortal width={action.containerWidth}>
        <BaseActionComponent
          action={action}
          resource={resource}
        />
      </DrawerPortal>
    )
  }

  return (
    <Wrapper width={action.containerWidth}>
      <ActionHeader
        resource={resource}
        action={action}
      />
      <BaseActionComponent
        action={action}
        resource={resource}
      />
    </Wrapper>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
