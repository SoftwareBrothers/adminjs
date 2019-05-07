import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Breadcrumbs from '../app/breadcrumbs'
import ActionHeader from '../app/action-header'
import WrapperBox from '../ui/wrapper-box'
import Notice from '../app/notice'
import BaseAction from '../app/base-action'
import { resourceType, matchType, pathsType } from '../../types'

const ResourceAction = (props) => {
  const { resources, match, paths } = props
  const { resourceId, actionName } = match.params

  const resource = resources.find(r => r.id === resourceId)
  const action = resource.resourceActions.find(r => r.name === actionName)

  return (
    <WrapperBox>
      <Breadcrumbs resource={resource} actionName={actionName} />
      <Notice />
      <ActionHeader
        resource={resource}
        action={action}
      />
      <BaseAction action={action} resource={resource} paths={paths} />
    </WrapperBox>
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
