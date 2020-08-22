import React from 'react'
import { LoggedUser, Box, DropDownItem, Link } from '@admin-bro/design-system'

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
  return (
    <Box flexShrink={0} py="lg">
      <LoggedUser
        email={session.email}
        title={session.title}
        avatarUrl={session.avatarUrl}
      >
        <DropDownItem>
          <Link href={paths.logoutPath}>{translateButton('logout')}</Link>
        </DropDownItem>
      </LoggedUser>
    </Box>
  )
}

export default allowOverride(LoggedIn, 'LoggedIn')
