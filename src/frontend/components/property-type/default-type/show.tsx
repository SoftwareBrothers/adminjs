
import React, { ReactNode } from 'react'

import PropertyInShow from '../../ui/property-in-show'
import { PropertyProps } from '../base-property-props'

export default class Show extends React.PureComponent<PropertyProps> {
  render(): ReactNode {
    const { property, record } = this.props

    const value = record.params[property.name] || ''

    const className = property.availableValues ? 'tag' : ''

    return (
      <PropertyInShow property={property}>
        <div className={className}>
          {value.split(/(?:\r\n|\r|\n)/g).map((line, i) => (
            // eslint-disable-next-line react/no-array-index-key
            <React.Fragment key={i}>
              {line}
              <br />
            </React.Fragment>
          ))}
        </div>
      </PropertyInShow>
    )
  }
}
