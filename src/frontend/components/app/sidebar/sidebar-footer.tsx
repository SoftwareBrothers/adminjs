import React from 'react'
import { Box, SoftwareBrothers } from '@admin-bro/design-system'

import { useSelector } from 'react-redux'

import allowOverride from '../../../hoc/allow-override'
import { ReduxState } from '../../../store/store'

const branding = useSelector((state: ReduxState) => state.branding)

const SidebarFooter: React.FC = () => (
  <Box mt="lg">
    {branding?.softwareBrothers && <SoftwareBrothers />} 
  </Box>
)

export default allowOverride(SidebarFooter, 'SidebarFooter')
