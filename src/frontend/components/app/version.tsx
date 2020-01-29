import React from 'react'
import { VersionProps } from '../../../admin-bro-options.interface'
import { Text, Box } from '../design-system'

export type Props = {
  versions: VersionProps;
}


const Version: React.FC<Props> = (props) => {
  const { versions } = props
  const { admin, app } = versions
  return (
    <Box flexGrow={1} py="default" px="xxl">
      {admin && (
        <Text color="grey">
          <b>Admin: </b>
          {admin}
        </Text>
      )}
      {app && (
        <Text color="grey">
          <b>app:</b>
          {app}
        </Text>
      )}
    </Box>
  )
}

export default Version
