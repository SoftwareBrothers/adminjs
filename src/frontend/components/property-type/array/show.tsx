import React, { ReactNode } from 'react'
import { Section, ValueGroup } from '@adminjs/design-system'

import { RecordJSON, PropertyJSON } from '../../../interfaces'
import { flat } from '../../../../utils'
import { convertToSubProperty } from './convert-to-sub-property'

type Props = {
  property: PropertyJSON;
  record: RecordJSON;
  ItemComponent: typeof React.Component;
}

export default class Show extends React.PureComponent<Props> {
  render(): ReactNode {
    const { property, record, ItemComponent } = this.props

    const items = flat.get(record.params, property.path) || []

    return (
      <ValueGroup label={property.label}>
        <Section>
          {(items || []).map((item, i) => {
            const itemProperty = convertToSubProperty(property, i)
            return (
              <ItemComponent
                {...this.props}
                key={itemProperty.path}
                property={itemProperty}
              />
            )
          })}
        </Section>
      </ValueGroup>
    )
  }
}
