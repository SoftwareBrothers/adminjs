import React from 'react'

import { CurrentAdmin } from '../../../current-admin.interface'
import { LoggedUser, Box, DropDownItem, Link } from '../design-system'
import { useTranslation } from '../../hooks'

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

export default LoggedIn
