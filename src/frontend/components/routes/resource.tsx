import React, { useState } from 'react'
import { connect } from 'react-redux'

import { RouteComponentProps } from 'react-router'
import Breadcrumbs from '../app/breadcrumbs'
import ActionHeader from '../app/action-header'
import WrapperBox from '../ui/wrapper-box'
import Notice from '../app/notice'
import BaseAction from '../app/base-action-component'
import Filter from '../app/filter'
import queryHasFilter from './utils/query-has-filter'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import { ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../ui/error-message'
import { ResourceActionParams } from '../../../backend/utils/view-helpers'
import { Box, H2, Badge, Button, Icon } from '../design-system'
import { ActionButton } from '../app'

type PropsFromState = {
  resources: Array<ResourceJSON>;
}

type Props = PropsFromState & RouteComponentProps<ResourceActionParams>

const ResourceAction: React.FC<Props> = (props) => {
  const { resources, match, location } = props
  const { resourceId } = match.params

  const resource = resources.find(r => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }
  const actionName = 'list'
  const listAction = resource.resourceActions.find(r => r.name === 'list')
  const newAction = resource.resourceActions.find(r => r.name === 'new')
  if (!listAction) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  const [filterVisible, setFilerVisible] = useState(queryHasFilter(location.search))
  const [tag, setTag] = useState('')

  return (
    <Box variant="grey">
      <Breadcrumbs resource={resource} actionName={actionName} />
      <Box flex flexDirection="row">
        <Box flexGrow={1}>
          <H2 my="xl">
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

// /* <WrapperBox>
//         <Breadcrumbs resource={resource} actionName={actionName} />
// <ActionHeader
//   resource={resource}
//   action={action}
//   tag={tag}
//   toggleFilter={action.showFilter ? (): void => setFilerVisible(!filterVisible) : undefined}
// />
//         <BaseAction action={action} resource={resource} setTag={setTag} />
//       </WrapperBox>
//       {action.showFilter ? (
//         <Filter
//           resource={resource}
//           isVisible={filterVisible}
//           toggleFilter={(): void => { setFilerVisible(!filterVisible) }}
//         />
//       ) : ''} */}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
