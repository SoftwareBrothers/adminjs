import { Box, Text, ValueGroup } from '@adminjs/design-system'
import React, { FC } from 'react'
import xss from 'xss'

import { EditPropertyProps } from '../base-property-props.js'
import allowOverride from '../../../hoc/allow-override.js'
import { useTranslation } from '../../../hooks/index.js'

type InnerHtmlProp = {
  __html: string;
}

const Show: FC<EditPropertyProps> = (props) => {
  const { property, record } = props
  const { translateProperty } = useTranslation()
  const value: string = record.params[property.path] || ''

  const createMarkup = (html: string): InnerHtmlProp => ({ __html: xss(html) })

  return (
    <ValueGroup label={translateProperty(property.label, property.resourceId)}>
      <Box py="xl" px={['0', 'xl']} border="default">
        <Text dangerouslySetInnerHTML={createMarkup(value)} />
      </Box>
    </ValueGroup>
  )
}

export default allowOverride(Show, 'DefaultRichtextShowProperty')
