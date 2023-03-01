import React from 'react'
import { Section, ValueGroup } from '@adminjs/design-system'

import { flat } from '../../../../utils'
import { convertToSubProperty } from './convert-to-sub-property'
import allowOverride from '../../../hoc/allow-override'
import { ShowPropertyProps } from '../base-property-props'
import { useTranslation } from '../../../hooks'

type Props = ShowPropertyProps & {
  ItemComponent: typeof React.Component;
}

const Show: React.FC<Props> = (props) => {
  const { property, record, ItemComponent } = props
  const { translateProperty } = useTranslation()

  const items = flat.get(record.params, property.path) || []

  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      <Section>
        {(items || []).map((item, i) => {
          const itemProperty = convertToSubProperty(property, i)
          return (
            <ItemComponent
              {...props}
              key={itemProperty.path}
              property={itemProperty}
            />
          )
        })}
      </Section>
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultArrayShowProperty')
