import { Box, BoxProps, Icon, cssClass } from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'
import React from 'react'
import { useSelector } from 'react-redux'

import allowOverride from '../../hoc/allow-override.js'
import { ReduxState } from '../../store/store.js'
import LanguageSelect from './language-select/language-select.js'
import LoggedIn from './logged-in.js'
import Version from './version.js'

const NavBar = styled(Box)<BoxProps>`
  height: ${({ theme }) => theme.sizes.navbarHeight};
  border-bottom: ${({ theme }) => theme.borders.default};
  background: ${({ theme }) => theme.colors.container};
  display: flex;
  flex-direction: row;
  flex-shrink: 0;
  align-items: center;
`

NavBar.defaultProps = {
  className: cssClass('NavBar'),
}

type Props = {
  toggleSidebar: () => void
}

const TopBar: React.FC<Props> = (props) => {
  const { toggleSidebar } = props
  const session = useSelector((state: ReduxState) => state.session)
  const paths = useSelector((state: ReduxState) => state.paths)
  const versions = useSelector((state: ReduxState) => state.versions)

  return (
    <NavBar data-css="topbar">
      <Box
        py="lg"
        px={['default', 'lg']}
        onClick={toggleSidebar}
        display={['block', 'block', 'block', 'block', 'none']}
        style={{ cursor: 'pointer' }}
      >
        <Icon icon="Menu" size={24} />
      </Box>
      <Version versions={versions} />
      <LanguageSelect />
      {session && session.email ? <LoggedIn session={session} paths={paths} /> : ''}
    </NavBar>
  )
}

const OverridableTopbar = allowOverride<Props>(TopBar, 'TopBar')

export { OverridableTopbar as TopBar, OverridableTopbar as default, TopBar as OriginalTopBar }
