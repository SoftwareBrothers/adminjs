import React from 'react'
import { EditPropertyProps } from 'admin-bro'
import { Button, Box } from '@admin-bro/design-system'

const ValueTrigger: React.FC<EditPropertyProps> = (props) => {
  const { onChange, record } = props

  const handleClick = (): void => {
    onChange({
      ...record,
      params: {
        ...record.params,
        name: 'my new name',
      },
    })
  }

  return (
    <Box mb="xxl">
      <Button data-testid="name-button" type="button" onClick={handleClick}>Set Name</Button>
    </Box>
  )
}

export default ValueTrigger
