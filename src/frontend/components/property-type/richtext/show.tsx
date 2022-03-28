import { Box, Text, ValueGroup } from '@adminjs/design-system'
import React, { FC, useEffect, useRef } from 'react'
import { EditPropertyProps } from '../base-property-props'

const Show: FC<EditPropertyProps> = (props) => {
  const { property, record } = props
  const contentRef = useRef<any>(null)

  useEffect(() => {
    if (contentRef.current) {
      const value: string = record.params[property.path] || ''
      contentRef.current.innerHTML = value
    }
  }, [])

  return (
    <ValueGroup label={property.label}>
      <Box py="xl" px={['0', 'xl']} border="default">
        <Text ref={contentRef} />
      </Box>
    </ValueGroup>
  )
}

export default Show
