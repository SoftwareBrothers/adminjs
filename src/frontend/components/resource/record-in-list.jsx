import React from 'react'

import ViewHelpers from '../../../backend/utils/view-helpers'
import ActionBtn from './action-btn'
import PropertyType from '../property-type'

export default class RecordInList extends React.PureComponent {
  renderActionBtn(action, record) {
    const h = new ViewHelpers()
    const actionWithHref = {
      href: h.recordActionUrl(this.props.resource.id, record.id, action.name),
      ...action,
    }
    return (
      <ActionBtn action={actionWithHref} key={action.name} className="is-white" />
    )
  }

  render() {
    const resource = this.props.resource
    const record = this.props.record
    const { recordActions } = resource
    return (
      <tr>
        {resource.listProperties.map(property => (
          <td key={property.name}>
            <PropertyType
              key={property.name}
              where="list"
              property={property}
              resource={resource}
              record={record} />
          </td>
        ))}
        <td key={'options'}>
          <div className="dropdown is-right is-hoverable">
            <div className="dropdown-trigger">
              <div className="dots">
                <span className="icon"><i className="icomoon-options"></i></span>
              </div>
            </div>
            <div className="dropdown-menu">
              <div className="dropdown-content">
                {recordActions.map(action => this.renderActionBtn(action, record))}
              </div>
            </div>
          </div>
        </td>
      </tr>
    )
  }
}