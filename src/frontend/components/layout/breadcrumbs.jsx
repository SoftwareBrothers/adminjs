import React from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { resourceType, recordType } from '../../types'
import { sizes, fonts, colors } from '../../styles/variables'

const BreadcrumbsContainer = styled.nav.attrs({
  className: 'breadcrumb',
})`
  margin: -${sizes.padding} 0 ${sizes.padding} -10px;
  font-size: ${fonts.base};
`

const BreadcrumbLink = styled(Link)`
  &&& {
    color: ${colors.lightText};
    &:hover {
      color: ${colors.primary};
    }
  }
`

class Breadcrumbs extends React.PureComponent {
  renderResource() {
    const { resource, record } = this.props
    return (
      <li>
        <BreadcrumbLink to={resource.href} className={record && 'is-active'}>
          {resource.name}
        </BreadcrumbLink>
      </li>
    )
  }

  renderAction() {
    const { actionName, resource } = this.props
    const action = resource.resourceActions.find(a => a.name === actionName) ||
      resource.recordActions.find(a => a.name === actionName)
    if (actionName) {
      return (
        <li className="is-active">
          <BreadcrumbLink href="#">{action.label}</BreadcrumbLink>
        </li>
      )
    }
    return null
  }

  render() {
    return (
      <BreadcrumbsContainer>
        <ul>
          {this.renderResource()}
          {this.renderAction()}
        </ul>
      </BreadcrumbsContainer>
    )
  }
}

Breadcrumbs.propTypes = {
  resource: resourceType.isRequired,
  record: recordType,
  actionName: PropTypes.string,
}

Breadcrumbs.defaultProps = {
  record: null,
  actionName: null,
}

export default Breadcrumbs
