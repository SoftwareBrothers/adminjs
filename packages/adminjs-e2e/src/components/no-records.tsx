import React from 'react'
import { NoRecordsProps, Box } from '@adminjs/design-system'

const NoRecords: React.FC<NoRecordsProps> = (props) => {
  const { resource, OriginalComponent } = props
  if (resource.id === 'ExternalEmployees') {
    return <Box>External - can create?</Box>
  }
  return <OriginalComponent {...props} />
}

export default NoRecords
