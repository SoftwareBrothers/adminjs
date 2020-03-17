import React from 'react'
import styled from 'styled-components'

import { VersionProps } from '../../../admin-bro-options.interface'
import { Text, Box } from '../design-system'
import { useTranslation } from '../../hooks'
import { cssClass } from '../design-system/utils/css-class'

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

const Version: React.FC<Props> = (props) => {
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
