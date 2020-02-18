import React from 'react'
import styled from 'styled-components'

import { VersionProps } from '../../../admin-bro-options.interface'
import { Text, Box } from '../design-system'
import { useTranslation } from '../../hooks'

export type Props = {
  versions: VersionProps;
}

const VersionItem = styled(Text)`
  color: ${({ theme }): string => theme.colors.black};
  padding: 12px 24px 12px 0;
  display: inline-block;
`

const Version: React.FC<Props> = (props) => {
  const { versions } = props
  const { admin, app } = versions

  const { translateLabel } = useTranslation()

  return (
    <Box flexGrow={1} py="default" px="xxl">
      {admin && (
        <VersionItem color="black">
          {translateLabel('adminVersion', { version: admin })}
        </VersionItem>
      )}
      {app && (
        <VersionItem color="black">
          {translateLabel('appVersion', { version: app })}
        </VersionItem>
      )}
    </Box>
  )
}

export default Version
