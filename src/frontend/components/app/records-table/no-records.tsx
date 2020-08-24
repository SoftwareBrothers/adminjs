import React from 'react'
import { Link } from 'react-router-dom'
import { Text, Button, Icon, InfoBox } from '@admin-bro/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { useTranslation } from '../../../hooks'
import allowOverride from '../../../hoc/allow-override'

export type NoRecordsProps = {
  resource: ResourceJSON;
}

const NoRecordsOriginal: React.FC<NoRecordsProps> = (props) => {
  const { resource } = props
  const h = new ViewHelpers()
  const { translateButton, translateMessage } = useTranslation()

  const canCreate = resource.resourceActions.find(a => a.name === 'new')
  const newAction = h.resourceActionUrl({ resourceId: resource.id, actionName: 'new' })

  return (
    <InfoBox title={translateMessage('noRecords', resource.id)}>
      <Text>
        {translateMessage('noRecordsInResource', resource.id)}
      </Text>
      {canCreate ? (
        <Text mt="xl">
          <Link to={newAction}>
            <Button variant="primary" as="span">
              <Icon icon="Add" />
              {translateButton('createFirstRecord', resource.id)}
            </Button>
          </Link>
        </Text>
      ) : ''}
    </InfoBox>
  )
}

// This hack prevents rollup from throwing an error
const NoRecords = allowOverride(NoRecordsOriginal, 'NoRecords')
export { NoRecords }

export default NoRecords
