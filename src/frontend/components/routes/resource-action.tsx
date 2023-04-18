import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'

import BaseActionComponent from '../app/base-action-component.js'
import { ResourceJSON } from '../../interfaces/index.js'
import { ReduxState } from '../../store/store.js'
import { NoResourceError, NoActionError } from '../app/error-message.js'
import { ResourceActionParams } from '../../../backend/utils/view-helpers/view-helpers.js'
import { ActionHeader } from '../app/index.js'
import Wrapper from './utils/wrapper.js'
import DrawerPortal from '../app/drawer-portal.js'
import FilterDrawer from '../app/filter-drawer.js'
import allowOverride from '../../hoc/allow-override.js'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState

const ResourceAction: React.FC<Props> = (props) => {
  const params = useParams<ResourceActionParams>()
  const { resources } = props
  const { resourceId, actionName } = params
  const [filterVisible, setFilterVisible] = useState(false)
  const [tag, setTag] = useState('')

  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId!} />)
  }
  const action = resource.resourceActions.find((r) => r.name === actionName)
  if (!action) {
    return (<NoActionError resourceId={resourceId!} actionName={actionName!} />)
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

export default allowOverride(connect(mapStateToProps)(ResourceAction), 'ResourceActionRoute')
