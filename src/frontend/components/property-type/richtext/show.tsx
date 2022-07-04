import { Box, Text, ValueGroup } from '@adminjs/design-system'
import React, { FC } from 'react'
import { EditPropertyProps } from '../base-property-props'
import xss from 'xss'

type innerHtmlProp = {
  __html: string
}

const Show: FC<EditPropertyProps> = (props) => {
  const { property, record } = props

  const value: string = record.params[property.path] || ''

  const createMarkup = (html: string): innerHtmlProp => ({ __html: xss(html) })

  return (
    <ValueGroup label={property.label}>
      <Box py="xl" px={['0', 'xl']} border="default">
        <Text dangerouslySetInnerHTML={createMarkup(value)} />
      </Box>
    </ValueGroup>
  )
}

export default Show
