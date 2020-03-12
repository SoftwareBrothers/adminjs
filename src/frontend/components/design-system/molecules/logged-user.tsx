import React from 'react'
import styled from 'styled-components'
import { Box } from '../atoms/box'
import { DropDown, DropDownTrigger, DropDownMenu } from './drop-down/index'
import { Text } from '../atoms/text'
import { Icon } from '../atoms/icon'

const height = '46px'

const LoggedUserInfo = styled(Box)`
  display: flex;
  flex-direction: row;
  vertical-align: middle;
  color: ${({ theme }): string => theme.colors.grey60};
  height: ${height};

  & img {
    border-radius: 9999px;
    margin-right: 0 8px;
    width: 36px;
    height: 36px;
    object-fit: cover;
    border-radius: 9999px;
  }
`

export type LoggedUserProps = {
  email: string;
  title?: string;
  avatarUrl?: string;
}

export const LoggedUser: React.FC<LoggedUserProps> = (props) => {
  const { email, title, avatarUrl, children } = props

  return (
    <DropDown>
      <DropDownTrigger>
        <LoggedUserInfo pr="xl">
          <Box mr="default">
            <Text
              fontSize="default"
              lineHeight={title ? 'lg' : 'xl'}
              fontWeight="normal"
            >
              {email}
            </Text>
            <Text fontSize="sm" color="grey40" lineHeight="sm">{title}</Text>
          </Box>
          {avatarUrl ? (
            <img src={avatarUrl} alt="avatar" />
          ) : null}
          <Icon icon="OverflowMenuVertical" size={16} my="default" color="grey60" />
        </LoggedUserInfo>
      </DropDownTrigger>
      <DropDownMenu top={height}>
        {children}
      </DropDownMenu>
    </DropDown>
  )
}
