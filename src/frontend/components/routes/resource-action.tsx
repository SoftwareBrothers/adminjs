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
import { Paths, ReduxState } from '../../store/store'
import { NoResourceError, NoActionError } from '../ui/error404'
import NoticeWrapper from './styled/notice-wrapper.styled'
import { ResourceActionParams } from '../../../backend/utils/view-helpers'

type PropsFromState = {
  resources: Array<ResourceJSON>;
  paths: Paths;
}

type Props = PropsFromState & RouteComponentProps<ResourceActionParams>

const ResourceAction: React.FC<Props> = (props) => {
  const { resources, match, location } = props
  const { resourceId, actionName } = match.params

  const resource = resources.find(r => r.id === resourceId)
  if (!resource) {
    return (<NoResourceError resourceId={resourceId} />)
  }
  const action = resource.resourceActions.find(r => r.name === actionName)
  if (!action) {
    return (<NoActionError resourceId={resourceId} actionName={actionName} />)
  }

  const [filterVisible, setFilerVisible] = useState(queryHasFilter(location.search))
  const [tag, setTag] = useState('')

  return (
    <div>
      <NoticeWrapper>
        <Notice />
      </NoticeWrapper>
      <WrapperBox>
        <Breadcrumbs resource={resource} actionName={actionName} />
        <ActionHeader
          resource={resource}
          action={action}
          tag={tag}
          toggleFilter={action.showFilter ? (): void => setFilerVisible(!filterVisible) : undefined}
        />
        <BaseAction action={action} resource={resource} setTag={setTag} />
      </WrapperBox>
      {action.showFilter ? (
        <Filter
          resource={resource}
          isVisible={filterVisible}
          toggleFilter={(): void => { setFilerVisible(!filterVisible) }}
        />
      ) : ''}
    </div>
  )
}

const mapStateToProps = (state: ReduxState): PropsFromState => ({
  paths: state.paths,
  resources: state.resources,
})

export default connect(mapStateToProps)(ResourceAction)
