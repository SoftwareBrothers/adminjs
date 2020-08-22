import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'
import { Box } from '@admin-bro/design-system'

import { RouteComponentProps } from 'react-router'
import BaseAction from '../app/base-action-component'
import Filter from '../app/filter'
import queryHasFilter from './utils/query-has-filter'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../app/error-message'
import ViewHelpers, {
  ResourceActionParams, RecordActionParams, BulkActionParams,
} from '../../../backend/utils/view-helpers'
import { ActionHeader } from '../app'
import ActionJSON from '../../../backend/decorators/action-json.interface'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState & RouteComponentProps<ResourceActionParams>

const getAction = (resource: ResourceJSON): ActionJSON | undefined => {
  const h = new ViewHelpers()

  const resourceId = ':resourceId'
  const actionName = ':actionName'
  const recordId = ':recordId'

  const recordActionUrl = h.recordActionUrl({ resourceId, recordId, actionName })
  const resourceActionUrl = h.resourceActionUrl({ resourceId, actionName })
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName })

  const resourceActionMatch = useRouteMatch<ResourceActionParams>(resourceActionUrl)
  const recordActionMatch = useRouteMatch<RecordActionParams>(recordActionUrl)
  const bulkActionMatch = useRouteMatch<Pick<BulkActionParams, 'actionName' | 'resourceId'>>(bulkActionUrl)

  const action = resourceActionMatch?.params.actionName
    || recordActionMatch?.params.actionName
    || bulkActionMatch?.params.actionName

  return action ? resource.actions.find(a => a.name === action) : undefined
}

const ResourceAction: React.FC<Props> = (props) => {
  const { resources, match, location } = props
  const { resourceId } = match.params

  const [filterVisible, setFilerVisible] = useState(queryHasFilter(location.search))
  const [tag, setTag] = useState('')

  const resource = resources.find(r => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }

  const realEndAction = getAction(resource)
  if (realEndAction && !realEndAction.showInDrawer) {
    return null
  }

  const listActionName = 'list'
  const listAction = resource.resourceActions.find(r => r.name === listActionName)

  if (!listAction) {
    return (<NoActionError resourceId={resourceId} actionName={listActionName} />)
  }

  const toggleFilter = listAction.showFilter
    ? ((): void => setFilerVisible(!filterVisible))
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
        <Filter
          resource={resource}
          isVisible={filterVisible}
          toggleFilter={(): void => { setFilerVisible(!filterVisible) }}
        />
      ) : ''}
    </Box>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
