import React from 'react'
import { Link } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { ErrorBox } from '../../design-system/molecules/error-box'
import { Text, Button, Icon } from '../../design-system'

type Props = {
  resource: ResourceJSON;
}

const NoRecords: React.FC<Props> = (props) => {
  const { resource } = props
  const canCreate = resource.resourceActions.find(a => a.name === 'new')
  const h = new ViewHelpers()
  const newAction = h.resourceActionUrl({ resourceId: resource.id, actionName: 'new' })

  return (
    <ErrorBox title="No records">
      <Text>
        There are no records in this resource.
      </Text>
      {canCreate ? (
        <Text mt="xl">
          <Link to={newAction}>
            <Button variant="primary" as="span">
              <Icon icon="Add" />
            Create First Record
            </Button>
          </Link>
        </Text>
      ) : ''}
    </ErrorBox>
  )
}

export default NoRecords
