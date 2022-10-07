import React from 'react'
import { Section, FormGroup, Input, Box, ValueGroup } from '@adminjs/design-system'

import { ShowPropertyProps } from '../base-property-props'
import { flat } from '../../../../utils/flat'
import { useTranslation } from '../../../hooks/use-translation'

export type ShowKeyValuePairProps = {
  objectValue: string
  objectKey: string
}

const ShowKeyValuePair: React.FC<ShowKeyValuePairProps> = (props) => {
  const {
    objectValue,
    objectKey,
  } = props
  const { tm } = useTranslation()

  return (
    <Box flex mb="lg">
      <FormGroup mr="lg" mb="0px">
        <Input
          placeholder={tm('keyPlaceholder')}
          value={objectKey}
          disabled
        />
      </FormGroup>
      <FormGroup mb="0px">
        <Input
          placeholder={tm('valuePlaceholder')}
          value={objectValue}
          disabled
        />
      </FormGroup>
    </Box>
  )
}

const Show: React.FC<ShowPropertyProps> = (props) => {
  const { property, record } = props

  const objectValue: Record<string, string> = flat.get(record.params, property.path) ?? {}

  return (
    <ValueGroup label={property.label}>
      <Section>
        {Object.entries(objectValue).map(([key, value]) => (
          <ShowKeyValuePair
            key={key}
            objectValue={value}
            objectKey={key}
          />
        ))}
      </Section>
    </ValueGroup>
  )
}

export default Show
