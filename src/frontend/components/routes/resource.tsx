import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useMatch, useParams } from 'react-router'
import { Box } from '@adminjs/design-system'

import BaseAction from '../app/base-action-component'
import FilterDrawer from '../app/filter-drawer'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../app/error-message'
import ViewHelpers, { ResourceActionParams } from '../../../backend/utils/view-helpers/view-helpers'
import { ActionHeader } from '../app'
import { ActionJSON, ResourceJSON } from '../../interfaces'
import allowOverride from '../../hoc/allow-override'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState

type StringifiedBulk<T> = Omit<T, 'recordsId'> & {
  recordsIds?: string;
}

const getAction = (resource: ResourceJSON): ActionJSON | undefined => {
  const h = new ViewHelpers()

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })

  const resourceActionMatch = useMatch(
    resourceActionUrl,
  )
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

  const [filterVisible, setFilterVisible] = useState(false)
  const [tag, setTag] = useState('')

  if (!resourceId) {
    return null
  }

  const resource = resources.find((r) => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }

  const realEndAction = getAction(resource)
  if (realEndAction && !realEndAction.showInDrawer) {
    return null
  }

  const listActionName = 'list'
  const listAction = resource.resourceActions.find((r) => r.name === listActionName)

  if (!listAction) {
    return (<NoActionError resourceId={resourceId} actionName={listActionName} />)
  }

  const toggleFilter = listAction.showFilter
    ? ((): void => setFilterVisible(!filterVisible))
    : undefined

  return (
    <Box variant="grey" width={listAction.containerWidth} mx="auto">
      <ActionHeader
        resource={resource}
        action={listAction}
        tag={tag}
        toggleFilter={toggleFilter}
      />
      <BaseAction action={listAction} resource={resource} setTag={setTag} />
      {listAction.showFilter ? (
        <FilterDrawer
          key={filterVisible.toString()}
          resource={resource}
          isVisible={filterVisible}
          toggleFilter={(): void => { setFilterVisible(!filterVisible) }}
        />
      ) : ''}
    </Box>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default allowOverride(connect(mapStateToProps)(ResourceAction), 'ResourceRoute')
