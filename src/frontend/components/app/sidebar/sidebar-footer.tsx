import React from 'react'
import { Box, SoftwareBrothers } from '@admin-bro/design-system'
import { useSelector } from 'react-redux'

import allowOverride from '../../../hoc/allow-override'
import { ReduxState } from '../../../store/store'

const SidebarFooter: React.FC = () => (
  const branding = useSelector((state: ReduxState) => state.branding)
  <Box mt="lg">
    {branding?.softwareBrothers && <SoftwareBrothers />} 
  </Box>
)

export default allowOverride(SidebarFooter, 'SidebarFooter')
