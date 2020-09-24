import React from 'react'
import styled from 'styled-components'
import { cssClass, Text, Box } from '@admin-bro/design-system'

import { VersionProps } from '../../../admin-bro-options.interface'
import { useTranslation } from '../../hooks'

export type Props = {
  versions: VersionProps;
}

const VersionItem = styled(Text)`
  padding: 12px 24px 12px 0;
`

VersionItem.defaultProps = {
  display: ['none', 'block'],
  color: 'grey100',
}

export const Version: React.FC<Props> = (props) => {
  const { versions } = props
  const { admin, app } = versions

  const { translateLabel } = useTranslation()

  return (
    <Box flex flexGrow={1} py="default" px="xxl" className={cssClass('Version')}>
      {admin && (
        <VersionItem>
          {translateLabel('adminVersion', { version: admin })}
        </VersionItem>
      )}
      {app && (
        <VersionItem>
          {translateLabel('appVersion', { version: app })}
        </VersionItem>
      )}
    </Box>
  )
}

export default Version
