import React, { useState } from 'react'
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
import FilterDrawer from '../app/filter-drawer'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState & RouteComponentProps<ResourceActionParams>

const ResourceAction: React.FC<Props> = (props) => {
  const { resources, match } = props
  const { resourceId, actionName } = match.params
  const [filterVisible, setFilterVisible] = useState(false)
  const [tag, setTag] = useState('')

  const resource = resources.find(r => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }
  const action = resource.resourceActions.find(r => r.name === actionName)
  if (!action) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  const toggleFilter = action.showFilter
    ? ((): void => setFilterVisible(!filterVisible))
    : undefined

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
    <Wrapper width={action.containerWidth} showFilter={action.showFilter}>
      <ActionHeader
        resource={resource}
        action={action}
        toggleFilter={toggleFilter}
        tag={tag}
      />
      <BaseActionComponent
        action={action}
        resource={resource}
        setTag={setTag}
      />
      {action.showFilter ? (
        <FilterDrawer
          key={filterVisible.toString()}
          resource={resource}
          isVisible={filterVisible}
          toggleFilter={toggleFilter!}
        />
      ) : ''}
    </Wrapper>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
