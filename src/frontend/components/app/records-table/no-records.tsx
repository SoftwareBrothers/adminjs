import React from 'react'
import { Text, Button, Icon, InfoBox, Illustration, H4 } from '@adminjs/design-system'

import { ResourceJSON } from '../../../interfaces'
import { useTranslation } from '../../../hooks'
import allowOverride from '../../../hoc/allow-override'
import ActionButton from '../action-button/action-button'

export type NoRecordsProps = {
  resource: ResourceJSON;
}

const NoRecordsOriginal: React.FC<NoRecordsProps> = (props) => {
  const { resource } = props
  const { translateButton, translateMessage } = useTranslation()

  const canCreate = resource.resourceActions.find((a) => a.name === 'new')

  return (
    <InfoBox title="" variant="transparent">
      <Illustration variant="IdentityCard" />
      <H4 mb="lg">{translateMessage('noRecords', resource.id)}</H4>
      <Text mb="xxl">
        {translateMessage('noRecordsInResource', resource.id)}
      </Text>
      {canCreate ? (
        <ActionButton action={canCreate} resourceId={resource.id}>
          <Button variant="contained">
            <Icon icon="Plus" />
            {translateButton('createFirstRecord', resource.id)}
          </Button>
        </ActionButton>
      ) : ''}
    </InfoBox>
  )
}

// This hack prevents rollup from throwing an error
const NoRecords = allowOverride(NoRecordsOriginal, 'NoRecords')

export { NoRecords }
export default NoRecords
