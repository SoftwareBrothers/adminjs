import React from 'react'
import { Box } from '../atoms/box'
import { NavGroup } from '../organisms/nav-group'
import { Label } from '../atoms/label'
import { Text } from '../atoms/text'
import { H3 } from '../atoms/header'
import { Icon } from '../atoms/icon'
import { LoggedUser } from '../organisms/logged-user'

export default {
  title: 'Templates',
}

export const TopBar: React.FC = () => (
  <Box height="64px" flex flexDirection="row" borderBottom="1px solid" borderColor="greyPale">
    <Box flexGrow={1}>
      <Box py="default" px="xxl">
        <Text color="grey">
          <b>Admin: </b>
          1.7.1
        </Text>
        <Text color="grey">
          <b>App: </b>
          1.7.1
        </Text>
      </Box>
    </Box>
    <Box shrink={0} py={3}>
      <LoggedUser
        email="wojtek@krysiak.com"
        role="Administrator"
      />
    </Box>
  </Box>
)

type NavigationProps = {
  width?: string;
  borderColor?: string;
  borderRight?: string;
  px?: string;
}

export const Navigation: React.FC<NavigationProps> = props => (
  <Box flex flexDirection="column" {...props}>
    <Box flexShrink={0} px="lg" pb="xxl">
      <H3>
        <Icon icon="Menu" size={24} pr={5} />
        Logo
      </H3>
    </Box>
    <Box flexGrow={1}>
      <Label uppercase ml={4}>Navigation</Label>
      <NavGroup icon="Package" title="Some group">
        <Text my={3}>Product matches</Text>
        <Text my={3}>Brands</Text>
      </NavGroup>
      <NavGroup icon="Trophy" title="Another link">
        <Text my={3}>Trophies</Text>
        <Text my={3}>Categories</Text>
      </NavGroup>
    </Box>
    <Box flexShrink={0}>
      <Label uppercase ml={4}>Custom pages</Label>
      <Box p="8px 0" ml={4}>
        <Text>Page some</Text>
        <Text>Some other page</Text>
      </Box>
    </Box>
  </Box>
)
