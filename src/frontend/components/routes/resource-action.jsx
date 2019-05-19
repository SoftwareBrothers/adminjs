import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Breadcrumbs from '../app/breadcrumbs'
import ActionHeader from '../app/action-header'
import WrapperBox from '../ui/wrapper-box'
import Notice from '../app/notice'
import BaseAction from '../app/base-action'
import Filter from '../app/filter'
import { resourceType, matchType, pathsType } from '../../types'

const ResourceAction = (props) => {
  const { resources, match, paths } = props
  const { resourceId, actionName } = match.params

  const resource = resources.find(r => r.id === resourceId)
  const action = resource.resourceActions.find(r => r.name === actionName)

  const [filterVisible, setFilerVisible] = useState(false)

  return (
    <div>
      <WrapperBox>
        <Breadcrumbs resource={resource} actionName={actionName} />
        <Notice />
        <ActionHeader
          resource={resource}
          action={action}
          toggleFilter={action.showFilter ? () => setFilerVisible(!filterVisible) : undefined}
        />
        <BaseAction action={action} resource={resource} paths={paths} />
      </WrapperBox>
      {action.showFilter ? (
        <Filter
          resource={resource}
          isVisible={filterVisible}
          toggleFilter={() => setFilerVisible(!filterVisible)}
        />
      ) : ''}
    </div>
  )
}

const mapStateToProps = state => ({
  paths: state.paths,
  resources: state.resources,
})

ResourceAction.propTypes = {
  resources: PropTypes.arrayOf(resourceType).isRequired,
  match: matchType.isRequired,
  paths: pathsType.isRequired,
}

export default connect(mapStateToProps)(ResourceAction)
