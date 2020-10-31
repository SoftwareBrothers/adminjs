import React from 'react'
import { Text, Button, Icon, InfoBox } from '@admin-bro/design-system'

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

  const canCreate = resource.resourceActions.find(a => a.name === 'new')

  return (
    <InfoBox title={translateMessage('noRecords', resource.id)}>
      <Text mb="xxl">
        {translateMessage('noRecordsInResource', resource.id)}
      </Text>
      {canCreate ? (
        <ActionButton action={canCreate} resourceId={resource.id}>
          <Button variant="primary">
            <Icon icon="Add" />
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
