import React from 'react'
import { CurrentUserNav, Box, CurrentUserNavProps } from '@admin-bro/design-system'

import { useHistory } from 'react-router'
import { CurrentAdmin } from '../../../current-admin.interface'
import { useTranslation } from '../../hooks'
import allowOverride from '../../hoc/allow-override'

type Props = {
  session: CurrentAdmin;
  paths: {
    logoutPath: string;
  };
}

const LoggedIn: React.FC<Props> = (props) => {
  const { session, paths } = props
  const { translateButton } = useTranslation()
  const history = useHistory()

  const dropActions: CurrentUserNavProps['dropActions'] = [{
    label: translateButton('logout'),
    onClick: (event: Event): void => {
      event.preventDefault()
      history.push(paths.logoutPath)
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

export default allowOverride(LoggedIn, 'LoggedIn')
