import { Box } from '@adminjs/design-system'
import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useMatch, useParams } from 'react-router'

import ViewHelpers, { ResourceActionParams } from '../../../backend/utils/view-helpers/view-helpers.js'
import allowOverride from '../../hoc/allow-override.js'
import { ActionJSON, ResourceJSON } from '../../interfaces/index.js'
import { ReduxState } from '../../store/store.js'
import { getResourceElementCss } from '../../utils/index.js'
import BaseAction from '../app/base-action-component.js'
import { NoActionError, NoResourceError } from '../app/error-message.js'
import FilterDrawer from '../app/filter-drawer.js'
import { ActionHeader } from '../app/index.js'

type PropsFromState = {
  resources: Array<ResourceJSON>
}

type Props = PropsFromState

type StringifiedBulk<T> = Omit<T, 'recordsId'> & {
  recordsIds?: string
}

const getAction = (resource: ResourceJSON): ActionJSON | undefined => {
  const h = new ViewHelpers()

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })

  const resourceActionMatch = useMatch(resourceActionUrl)
  const recordActionMatch = useMatch(recordActionUrl)
  const bulkActionMatch = useMatch(bulkActionUrl)

  const action = resourceActionMatch?.params.actionName
    || recordActionMatch?.params.actionName
    || bulkActionMatch?.params.actionName

  return action ? resource.actions.find((a) => a.name === action) : undefined
}

const ResourceAction: React.FC<Props> = (props) => {
  const params = useParams<StringifiedBulk<ResourceActionParams>>()
  const { resources } = props
  const { resourceId } = params
  const [tag, setTag] = useState('')

  if (!resourceId) {
    return null
  }

  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) {
    return <NoResourceError resourceId={resourceId} />
  }

  const realEndAction = getAction(resource)
  if (realEndAction && !realEndAction.showInDrawer) {
    return null
  }

  const listActionName = 'list'
  const listAction = resource.resourceActions.find((r) => r.name === listActionName)

  if (!listAction) {
    return <NoActionError resourceId={resourceId} actionName={listActionName} />
  }

  const contentTag = getResourceElementCss(resource.id, 'list')

  return (
    <Box
      flex
      variant="transparent"
      alignItems="start"
      width={listAction.containerWidth}
      mx="auto"
      style={{ gap: 16 }}
      height="100%"
      data-css={contentTag}
    >
      <Box flex flexDirection="column" flexGrow={1}>
        <ActionHeader
          resource={resource}
          action={listAction}
          tag={tag}
          toggleFilter={listAction.showFilter}
        />
        <BaseAction action={listAction} resource={resource} setTag={setTag} />
      </Box>
      {listAction.showFilter && <FilterDrawer resource={resource} />}
    </Box>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default allowOverride(connect(mapStateToProps)(ResourceAction), 'ResourceRoute')
