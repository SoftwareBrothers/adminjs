import React, { ComponentClass } from 'react'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import BaseActionComponent from '../app/base-action-component'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../app/error-message'
import { ResourceActionParams } from '../../../backend/utils/view-helpers'
import { ActionHeader } from '../app'
import { Drawer } from '../design-system'
import Wrapper from './utils/wrapper'

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

  const ActionWrapper = (action.showInDrawer ? Drawer : Wrapper) as unknown as ComponentClass

  return (
    <ActionWrapper>
      {!action?.showInDrawer ? (
        <ActionHeader
          resource={resource}
          action={action}
        />
      ) : ''}
      <BaseActionComponent
        action={action}
        resource={resource}
      />
    </ActionWrapper>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
