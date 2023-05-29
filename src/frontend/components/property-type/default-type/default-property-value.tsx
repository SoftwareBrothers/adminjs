import { Badge } from '@adminjs/design-system'
import React, { type FC } from 'react'

import startCase from 'lodash/startCase.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/use-translation.js'
import { type ShowPropertyProps } from '../base-property-props.js'

const DefaultPropertyValue: FC<ShowPropertyProps> = ({
  property: { propertyPath, availableValues, path },
  record,
  resource: { id: resourceId },
}) => {
  const rawValue = record?.params[path]
  const { translateProperty } = useTranslation()

  if (typeof rawValue === 'undefined') return null

  // eslint-disable-next-line eqeqeq
  const option = availableValues?.find((opt) => opt.value == rawValue)

  if (option) {
    const label = option.label || rawValue
    return (
      <Badge>
        {translateProperty(`${propertyPath}.${label}`, resourceId, {
          defaultValue: startCase(label),
        })}
      </Badge>
    )
  }

  return rawValue
}

export default allowOverride(DefaultPropertyValue, 'DefaultPropertyValue')
