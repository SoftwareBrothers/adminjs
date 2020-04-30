import React from 'react'
import { useTranslation } from '../../../hooks'
import ResourceJSON from '../../../../backend/decorators/resource-json.interface'
import { Icon } from '../../design-system'
import PropertyJSON from '../../../../backend/decorators/property-json.interface'

type AddNewItemButtonProps = {
  resource: ResourceJSON;
  property: PropertyJSON;
}

const AddNewItemButton: React.FC<AddNewItemButtonProps> = (props) => {
  const { resource, property } = props
  const { translateProperty, translateButton } = useTranslation()
  const label = translateProperty(
    `${property.name}.addNewItem`,
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
