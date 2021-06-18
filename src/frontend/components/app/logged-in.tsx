import React from 'react'
import { CurrentUserNav, Box, CurrentUserNavProps } from '@adminjs/design-system'

import { CurrentAdmin } from '../../../current-admin.interface'
import { useTranslation } from '../../hooks'
import allowOverride from '../../hoc/allow-override'

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
    icon: 'Logout',
  }]
  return (
    <Box flexShrink={0}>
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
}
