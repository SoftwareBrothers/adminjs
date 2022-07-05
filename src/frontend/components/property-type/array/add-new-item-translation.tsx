import React from 'react'
import { Icon, Box } from '@adminjs/design-system'

import { useTranslation } from '../../../hooks'
import { ResourceJSON, PropertyJSON } from '../../../interfaces'

type AddNewItemButtonProps = {
  resource: ResourceJSON;
  property: PropertyJSON;
}

const AddNewItemButton: React.FC<AddNewItemButtonProps> = (props) => {
  const { resource, property } = props
  const { translateProperty, translateButton } = useTranslation()
  const label = translateProperty(
    `${property.path}.addNewItem`,
    resource.id, {
      defaultValue: translateButton('addNewItem', resource.id),
    },
  )

  return (
    <Box>
      <Icon icon="Add" />
      {label}
    </Box>
  )
}

export default AddNewItemButton
