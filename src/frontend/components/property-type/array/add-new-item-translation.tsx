import React from 'react'
import { Button, ButtonProps, Icon } from '@adminjs/design-system'

import { useTranslation } from '../../../hooks/index.js'
import { ResourceJSON, PropertyJSON } from '../../../interfaces/index.js'

type AddNewItemButtonProps = {
  resource: ResourceJSON;
  property: PropertyJSON;
} & ButtonProps

const AddNewItemButton: React.FC<AddNewItemButtonProps> = (props) => {
  const { resource, property, ...btnProps } = props
  const { translateProperty, translateButton } = useTranslation()
  const label = translateProperty(
    `${property.path}.addNewItem`,
    resource.id,
    {
      defaultValue: translateButton('addNewItem', resource.id),
    },
  )

  return (
    <Button type="button" variant="outlined" {...btnProps}>
      <Icon icon="Plus" />
      {label}
    </Button>
  )
}

export default AddNewItemButton
