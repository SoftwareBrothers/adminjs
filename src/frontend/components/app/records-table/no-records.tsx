import React from 'react'
import { Text, Button, Icon, InfoBox } from '@adminjs/design-system'

import { ResourceJSON } from '../../../interfaces/index.js'
import { useTranslation } from '../../../hooks/index.js'
import allowOverride from '../../../hoc/allow-override.js'
import ActionButton from '../action-button/action-button.js'

export type NoRecordsProps = {
  resource: ResourceJSON;
}

const NoRecordsOriginal: React.FC<NoRecordsProps> = (props) => {
  const { resource } = props
  const { translateButton, translateMessage } = useTranslation()

  const canCreate = resource.resourceActions.find((a) => a.name === 'new')

  return (
    <InfoBox title={translateMessage('noRecords', resource.id)} illustration="Docs">
      <Text mb="xxl">
        {translateMessage('noRecordsInResource', resource.id)}
      </Text>
      {canCreate && (
        <ActionButton action={canCreate} resourceId={resource.id}>
          <Button variant="contained">
            <Icon icon="Plus" />
            {translateButton('createFirstRecord', resource.id)}
          </Button>
        </ActionButton>
      )}
    </InfoBox>
  )
}

// This hack prevents rollup from throwing an error
const NoRecords = allowOverride(NoRecordsOriginal, 'NoRecords')

export { NoRecords, NoRecordsOriginal as OriginalNoRecords }
export default NoRecords
