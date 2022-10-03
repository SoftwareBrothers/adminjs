import React from 'react'
import { ValueGroup } from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props

  const value = record.params[property.path] || ''

  return (
    <ValueGroup label={property.label}>
      {value.split(/(?:\r\n|\r|\n)/g).map((line, i) => (
        // eslint-disable-next-line react/no-array-index-key
        <React.Fragment key={i}>
          {line}
          <br />
        </React.Fragment>
      ))}
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultTextareaShowProperty')
