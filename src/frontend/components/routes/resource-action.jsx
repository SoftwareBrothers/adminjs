import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Breadcrumbs from '../app/breadcrumbs'
import ActionHeader from '../app/action-header'
import WrapperBox from '../ui/wrapper-box'
import Notice from '../app/notice'
import { resourceType, matchType, pathsType } from '../../types'

import actions from '../actions'

class ResourceAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isClient: false,
    }
  }

  componentDidMount() {
    this.setState({ isClient: true })
  }

  render() {
    const { resources, match, paths } = this.props
    const { resourceId, actionName } = match.params
    const { isClient } = this.state

    const resource = resources.find(r => r.id === resourceId)
    const action = resource.resourceActions.find(r => r.name === actionName)

    let Action = actions[action.name]
    if (isClient && action.component) {
      Action = AdminBro.UserComponents[action.component]
    }
    Action = Action || (() => (<div />))

    return (
      <WrapperBox>
        <Breadcrumbs resource={resource} actionName={actionName} />
        <Notice />
        <ActionHeader
          resource={resource}
          action={action}
        />
        <Action action={action} resource={resource} paths={paths} />
      </WrapperBox>
    )
  }
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
