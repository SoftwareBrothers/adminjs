import React from 'react'
import { Icon } from '@admin-bro/design-system'

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
    <>
      <Icon icon="Add" />
      {label}
    </>
  )
}

export default AddNewItemButton
