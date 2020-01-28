import React from 'react'
import styled from 'styled-components'
import { Box } from '../atoms/box'
import { DropDown, DropDownTrigger, DropDownMenu, DropDownItem } from './drop-down'
import { Text } from '../atoms/text'
import { Icon } from '../atoms/icon'

const LoggedUserInfo = styled(Box)`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  color: ${({ theme }): string => theme.colors.grey};

  & ${Icon} {
    fill: ${({ theme }): string => theme.colors.grey};
  }

  & img {
    border-radius: 9999px;
    margin: 0 8px;
    width: 36px;
    height: 36px;
  }
`

export type LoggedUserProps = {
  email: string;
  role?: string;
}

export const LoggedUser: React.FC<LoggedUserProps> = (props) => {
  const { email, role } = props

  return (
    <DropDown>
      <DropDownTrigger>
        <LoggedUserInfo pr={5}>
          <Box>
            <Text
              fontSize="default"
              lineHeight={role ? 'lg' : 'xl'}
              fontWeight="normal"
            >
              {email}
            </Text>
            <Text fontSize="sm" color="greyLight" lineHeight="sm">{role}</Text>
          </Box>
          <img src="https://api.adorable.io/avatars/24/softwarebrothers.png" alt="avatar" />
          <Icon icon="OverflowMenuVertical" size={16} my="default" />
        </LoggedUserInfo>
      </DropDownTrigger>
      <DropDownMenu top="36px">
        <DropDownItem>
          Sign out
        </DropDownItem>
      </DropDownMenu>
    </DropDown>
  )
}
