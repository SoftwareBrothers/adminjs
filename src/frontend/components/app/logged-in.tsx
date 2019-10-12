import React from 'react'
import styled from 'styled-components'

import { CurrentAdmin } from '../../../current-admin.interface'

const UserBox = styled.div.attrs({
  className: 'navbar-link',
})`
  padding-right: ${({ theme }): string => theme.sizes.padding};
  border-radius: 50px;
  margin: 10px 0;

  img {
    border-radius: 50%;
    margin-left: ${({ theme }): string => theme.sizes.padding};

    &:after {
      display: none;
    }
  }
`

const Dropdown = styled.div.attrs({
  className: 'navbar-dropdown',
})`
  border-radius: 0px;
  border: none;
  padding: 0;
  top: 95%;
`

const DropdownLink = styled.a.attrs({
  className: 'navbar-item',
})`
  &&& {
    padding: ${({ theme }): string => `${theme.sizes.padding} ${theme.sizes.paddingLayout}`};
    color: ${({ theme }): string => theme.colors.defaultText};
    &:hover{
      color: ${({ theme }): string => theme.colors.primary};
    }
    i, svg {
      margin-right: ${({ theme }): string => theme.sizes.padding};
    }
  }
`

type Props = {
  session: CurrentAdmin;
  paths: {
    logoutPath: string;
  };
}

const LoggedIn: React.FC<Props> = (props) => {
  const { session, paths } = props
  return (
    <div className="navbar-item has-dropdown is-hoverable navbar-user">
      <UserBox>
        {session.email}
        <img src="https://api.adorable.io/avatars/24/softwarebrothers.png" alt="user" />
      </UserBox>
      <Dropdown>
        <DropdownLink href={paths.logoutPath}>
          <i className="fas fa-sign-out-alt" />
          Sign out
        </DropdownLink>
      </Dropdown>
    </div>
  )
}

export default LoggedIn
