import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { Text, Button, Icon, InfoBox } from '../../design-system'
import { useTranslation } from '../../../hooks'

type Props = {
  resource: ResourceJSON;
}

const NoRecords: React.FC<Props> = (props) => {
  const { resource } = props
  const h = new ViewHelpers()
  const { translateButton, translateMessage } = useTranslation()

  const canCreate = resource.resourceActions.find(a => a.name === 'new')
  const newAction = h.resourceActionUrl({ resourceId: resource.id, actionName: 'new' })

  return (
    <InfoBox title="No records">
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

export default NoRecords
