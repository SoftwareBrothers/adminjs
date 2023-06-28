import React from 'react'
import { cssClass, Text, Box } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

import { VersionProps } from '../../../adminjs-options.interface.js'
import { useTranslation } from '../../hooks/index.js'
import allowOverride from '../../hoc/allow-override.js'

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
    <Box flex flexGrow={1} py="default" px="xxl" className={cssClass('Version')} data-css="version">
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

const OverridableVersion = allowOverride(Version, 'Version')

export {
  OverridableVersion as default,
  OverridableVersion as Version,
  Version as OriginalVersion,
}
