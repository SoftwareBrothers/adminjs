import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'

import Breadcrumbs from '../app/breadcrumbs'
import ActionHeader from '../app/action-header'
import WrapperBox from '../ui/wrapper-box'
import Loader from '../ui/loader'
import Notice from '../app/notice'
import { resourceType, matchType, pathsType } from '../../types'
import BaseAction from '../app/base-action'
import ApiClient from '../../utils/api-client'

class RecordAction extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      record: null,
      isLoading: true,
    }
  }

  componentDidMount() {
    this.fetchRecord()
  }

  shouldComponentUpdate(newProps) {
    const { match } = this.props
    const { actionName, recordId, resourceId } = match.params
    if (newProps.match.params.actionName !== actionName
      || newProps.match.params.recordId !== recordId
      || newProps.match.params.resourceId !== resourceId
    ) {
      this.fetchRecord()
      return false
    }
    return true
  }

  getResourceAndAction(name = null) {
    const { match, resources } = this.props
    const { resourceId, actionName } = match.params

    const nameToCheck = name || actionName

    const resource = resources.find(r => r.id === resourceId)
    const action = resource.recordActions.find(r => r.name === nameToCheck)
    return { resource, action }
  }

  fetchRecord() {
    const { match } = this.props
    const { recordId, resourceId } = match.params
    const api = new ApiClient()
    this.setState({
      isLoading: true,
      record: null,
    })
    api.getRecord({
      resourceId,
      recordId,
    }).then((record) => {
      this.setState({
        isLoading: false,
        record,
      })
    })
  }

  render() {
    const { match, paths } = this.props
    const { actionName, recordId } = match.params
    const { record, isLoading } = this.state

    const { resource, action } = this.getResourceAndAction()

    return (
      <WrapperBox>
        <Breadcrumbs resource={resource} actionName={actionName} />
        <Notice />
        <ActionHeader
          resource={resource}
          recordId={recordId}
          action={action}
        />
        {isLoading
          ? <Loader />
          : <BaseAction action={action} resource={resource} record={record} paths={paths} />
        }
      </WrapperBox>
    )
  }
}


const mapStateToProps = state => ({
  paths: state.paths,
  resources: state.resources,
})

RecordAction.propTypes = {
  resources: PropTypes.arrayOf(resourceType).isRequired,
  match: matchType.isRequired,
  paths: pathsType.isRequired,
}

export default connect(mapStateToProps)(RecordAction)
