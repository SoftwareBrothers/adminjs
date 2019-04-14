import React from 'react'
import styled from 'styled-components'

import { pathsType, sessionType } from '../../types'
import { sizes, colors } from '../../styles/variables'

const UserBox = styled.div.attrs({
  className: 'navbar-link',
})`
  padding-right: ${sizes.padding};
  border-radius: 50px;
  margin: 10px 0;

  img {
    border-radius: 50%;
    margin-left: ${sizes.padding};

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
    padding: ${sizes.padding} ${sizes.paddingLayout};
    color: ${colors.defaultText};
    &:hover{
      color: ${colors.primary};
    }
    i, svg {
      margin-right: ${sizes.padding};
    }
  }
`

const LoggedIn = (props) => {
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

LoggedIn.propTypes = {
  session: sessionType.isRequired,
  paths: pathsType.isRequired,
}

export default LoggedIn
