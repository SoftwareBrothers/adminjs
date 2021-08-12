import React from 'react'
import { EditPropertyProps, flat } from 'adminjs'
import { Button, Box } from '@adminjs/design-system'

const ValueTrigger: React.FC<EditPropertyProps> = (props) => {
  const { onChange, record } = props

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const data = flat.unflatten(record.params)

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
