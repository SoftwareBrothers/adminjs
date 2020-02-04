import React, { useState } from 'react'
import { connect } from 'react-redux'
import { useRouteMatch } from 'react-router-dom'

import { RouteComponentProps } from 'react-router'
import Breadcrumbs from '../app/breadcrumbs'
import BaseAction from '../app/base-action-component'
import Filter from '../app/filter'
import queryHasFilter from './utils/query-has-filter'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../app/error-message'
import ViewHelpers, {
  ResourceActionParams, RecordActionParams, BulkActionParams,
} from '../../../backend/utils/view-helpers'
import { Box, H2, Badge, Button, Icon } from '../design-system'
import { ActionButton } from '../app'
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
  const bulkActionUrl = h.bulkActionUrl({ resourceId, actionName, recordIds: undefined })

  const resourceActionMatch = useRouteMatch<ResourceActionParams>(resourceActionUrl)
  const recordActionMatch = useRouteMatch<RecordActionParams>(recordActionUrl)
  const bulkActionMatch = useRouteMatch<BulkActionParams>(bulkActionUrl)

  const action = resourceActionMatch?.params.actionName
    || recordActionMatch?.params.actionName
    || bulkActionMatch?.params.actionName

  return action && resource.actions.find(a => a.name === action)
}

const ResourceAction: React.FC<Props> = (props) => {
  const { resources, match, location } = props
  const { resourceId } = match.params

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
  const newAction = resource.resourceActions.find(r => r.name === 'new')
  if (!listAction) {
    return (<NoActionError resourceId={resourceId} actionName={listActionName} />)
  }

  const [filterVisible, setFilerVisible] = useState(queryHasFilter(location.search))
  const [tag, setTag] = useState('')

  return (
    <Box variant="grey">
      <Breadcrumbs resource={resource} actionName={listActionName} />
      <Box flex flexDirection="row">
        <Box flexGrow={1}>
          <H2 mb="lg" mt="xl">
            {listAction.label}
            {tag ? (<Badge variant="primary" size="sm" ml="default">{tag}</Badge>) : ''}
          </H2>
        </Box>
        <Box mt="xl">
          {newAction ? (
            <ActionButton
              action={newAction}
              resourceId={resource.id}
            >
              <Button as="span" variant="primary" mr="default">
                <Icon icon={newAction.icon} />
                {newAction.label}
              </Button>
            </ActionButton>
          ) : ''}
          <Button onClick={(): void => setFilerVisible(!filterVisible)}>
            <Icon icon="SettingsAdjust" />
            Filter
          </Button>
        </Box>
      </Box>
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
