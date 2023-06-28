import React from 'react'
import { CurrentUserNav, Box, CurrentUserNavProps } from '@adminjs/design-system'

import { CurrentAdmin } from '../../../current-admin.interface.js'
import { useTranslation } from '../../hooks/index.js'
import allowOverride from '../../hoc/allow-override.js'

export type LoggedInProps = {
  session: CurrentAdmin;
  paths: {
    logoutPath: string;
  };
}

const LoggedIn: React.FC<LoggedInProps> = (props) => {
  const { session, paths } = props
  const { translateButton } = useTranslation()

  const dropActions: CurrentUserNavProps['dropActions'] = [{
    label: translateButton('logout'),
    onClick: (event: Event): void => {
      event.preventDefault()
      window.location.href = paths.logoutPath
    },
    icon: 'LogOut',
  }]
  return (
    <Box flexShrink={0} data-css="logged-in">
      <CurrentUserNav
        name={session.email}
        title={session.title}
        avatarUrl={session.avatarUrl}
        dropActions={dropActions}
      />
    </Box>
  )
}

const OverridableLoggedIn = allowOverride(LoggedIn, 'LoggedIn')

export {
  OverridableLoggedIn as default,
  OverridableLoggedIn as LoggedIn,
  LoggedIn as OriginalLoggedIn,
}
