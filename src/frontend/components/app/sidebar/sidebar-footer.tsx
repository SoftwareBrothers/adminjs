import React from 'react'
import { Box, Text, Icon, Link } from '@admin-bro/design-system'

import allowOverride from '../../../hoc/allow-override'

const SidebarFooter: React.FC = () => (
  <Box mt="lg">
    <Text color="grey60" textAlign="center" fontSize="sm">
      With
      <Icon icon="FavoriteFilled" color="love" mx="xs" />
      by
      <Link
        href="http://softwarebrothers.co"
        target="_blank"
        rel="noopener noreferrer"
        mx="xs"
      >
        SoftwareBrothers
      </Link>
    </Text>
  </Box>
)

export default allowOverride(SidebarFooter, 'SidebarFooter')
