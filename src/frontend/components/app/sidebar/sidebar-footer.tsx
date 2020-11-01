import React from 'react'
import { Box, SoftwareBrothers } from '@admin-bro/design-system'

import allowOverride from '../../../hoc/allow-override'

const SidebarFooter: React.FC = () => (
  <Box mt="lg">
    <SoftwareBrothers />
  </Box>
)

export default allowOverride(SidebarFooter, 'SidebarFooter')
