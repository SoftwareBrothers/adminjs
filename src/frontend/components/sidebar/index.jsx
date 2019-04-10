import React from 'react'
import { connect } from "react-redux"
import SidebarHeader from './sidebar-header'
import SidebarParent from './sidebar-parent'
import SidebarFooter from './sidebar-footer'

const groupResources = (resources) => {
  const map = resources.reduce((memo, resource) => {
    if (memo[resource.parent.name]) {
      memo[resource.parent.name].push(resource)
    } else {
      memo[resource.parent.name] = [resource]
    }
    memo[resource.parent.name].icon = resource.parent.icon
    return memo
  }, {})
  return Object.keys(map).map(parentName => ({
    name: parentName,
    icon: map[parentName].icon,
    resources: map[parentName],
  }))
}

class Sidebar extends React.Component {
  render() {
    return (
      <aside className="sidebar">
        <div className="sidebar-main">
          <div className="sidebar-content">
            <div className="sidebar-top">
              <SidebarHeader branding={this.props.branding} paths={this.props.paths}/>
              <div className="sidebar-navigation" style={{display: 'block'}}>
                <p className="menu-label">Navigation</p>
                <ul className="menu-list">
                  {groupResources(this.props.resources).map(parent => (
                    <SidebarParent parent={parent} key={parent.name}/>
                  ))}
                </ul>
              </div>
            </div>
            {this.props.branding.softwareBrothers && <SidebarFooter />}
          </div>
        </div>
      </aside>
    )
  }
}

const mapStateToProps = (state) => ({
  resources: state.resources,
  branding: state.branding,
  paths: state.paths,
})

export default connect(mapStateToProps)(Sidebar)