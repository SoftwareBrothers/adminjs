import { Box } from '@adminjs/design-system'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useParams } from 'react-router'

import { ResourceActionParams } from '../../../backend/utils/view-helpers/view-helpers.js'
import allowOverride from '../../hoc/allow-override.js'
import { ResourceJSON, actionHasDisabledComponent } from '../../interfaces/index.js'
import { ReduxState } from '../../store/store.js'
import BaseActionComponent from '../app/base-action-component.js'
import DrawerPortal from '../app/drawer-portal.js'
import { NoActionError, NoResourceError } from '../app/error-message.js'
import FilterDrawer from '../app/filter-drawer.js'
import { ActionHeader } from '../app/index.js'
import Wrapper from './utils/wrapper.js'
import { getDataCss, getResourceElementCss } from '../../utils/data-css-name.js'

type PropsFromState = {
  resources: Array<ResourceJSON>
}

type Props = PropsFromState

const ResourceAction: React.FC<Props> = (props) => {
  const params = useParams<ResourceActionParams>()
  const { resources } = props
  const { resourceId, actionName } = params
  const [tag, setTag] = useState('')
  const [filterVisible, setFilterVisible] = useState(false)

  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) {
    return <NoResourceError resourceId={resourceId!} />
  }

  const action = resource.resourceActions.find((r) => r.name === actionName)
  if (!action || actionHasDisabledComponent(action)) {
    return <NoActionError resourceId={resourceId!} actionName={actionName!} />
  }

  const listActionName = 'list'
  const listAction = resource.resourceActions.find((r) => r.name === listActionName)

  const contentTag = getResourceElementCss(resource.id, action.name)
  const routeActionCss = getDataCss(resource.id, action.actionType, action.name, 'route')

  if (action.showInDrawer) {
    if (!listAction) {
      return (
        <DrawerPortal width={action.containerWidth} data-css={routeActionCss}>
          <BaseActionComponent action={action} resource={resource} />
        </DrawerPortal>
      )
    }

    const toggleFilter = listAction.showFilter
      ? (): void => setFilterVisible(!filterVisible)
      : undefined

    return (
      <>
        <DrawerPortal width={action.containerWidth} data-css={routeActionCss}>
          <BaseActionComponent
            action={action}
            resource={resource}
            setTag={setTag}
          />
        </DrawerPortal>
        <Wrapper width={listAction.containerWidth} data-css={contentTag}>
          <ActionHeader
            resource={resource}
            action={listAction}
            tag={tag}
            toggleFilter={toggleFilter}
          />
          <BaseActionComponent action={listAction} resource={resource} setTag={setTag} />
        </Wrapper>
      </>
    )
  }

  return (
    <Wrapper width={action.containerWidth} showFilter={action.showFilter} data-css={contentTag}>
      <Box flex flexDirection="column" flexGrow={1}>
        <ActionHeader
          resource={resource}
          action={action}
          toggleFilter={action.showFilter}
          tag={tag}
        />
        <BaseActionComponent action={action} resource={resource} setTag={setTag} />
      </Box>
      {action.showFilter && <FilterDrawer resource={resource} />}
    </Wrapper>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default allowOverride(connect(mapStateToProps)(ResourceAction), 'ResourceActionRoute')
