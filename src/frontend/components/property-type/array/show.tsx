import React from 'react'
import { Section, ValueGroup } from '@adminjs/design-system'

import { flat } from '../../../../utils/index.js'
import { convertToSubProperty } from './convert-to-sub-property.js'
import allowOverride from '../../../hoc/allow-override.js'
import { ShowPropertyProps } from '../base-property-props.js'
import { useTranslation } from '../../../hooks/index.js'

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
