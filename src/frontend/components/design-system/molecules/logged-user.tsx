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
  color: ${({ theme }): string => theme.colors.grey};
  height: ${height};

  & img {
    border-radius: 9999px;
    margin: 0 8px;
    width: 36px;
    height: 36px;
  }
`

export type LoggedUserProps = {
  email: string;
  title?: string;
}

export const LoggedUser: React.FC<LoggedUserProps> = (props) => {
  const { email, title, children } = props

  return (
    <DropDown>
      <DropDownTrigger>
        <LoggedUserInfo pr="xl">
          <Box>
            <Text
              fontSize="default"
              lineHeight={title ? 'lg' : 'xl'}
              fontWeight="normal"
            >
              {email}
            </Text>
            <Text fontSize="sm" color="greyLight" lineHeight="sm">{title}</Text>
          </Box>
          <img src="https://api.adorable.io/avatars/24/softwarebrothers.png" alt="avatar" />
          <Icon icon="OverflowMenuVertical" size={16} my="default" color="grey" />
        </LoggedUserInfo>
      </DropDownTrigger>
      <DropDownMenu top={height}>
        {children}
      </DropDownMenu>
    </DropDown>
  )
}
