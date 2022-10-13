import React from 'react'
import { Box, MadeWithLove } from '@adminjs/design-system'
import { useSelector } from 'react-redux'
import { BrandingOptions } from '../../../../adminjs-options.interface'
import allowOverride from '../../../hoc/allow-override'
import { ReduxState } from '../../../store'

const SidebarFooter: React.FC = () => {
  const branding = useSelector<ReduxState, BrandingOptions>((state) => state.branding)

  return (
    <Box mt="lg" mb="md" data-css="sidebar-footer">
      {branding.withMadeWithLove && <MadeWithLove />}
    </Box>
  )
}

export default allowOverride(SidebarFooter, 'SidebarFooter')
