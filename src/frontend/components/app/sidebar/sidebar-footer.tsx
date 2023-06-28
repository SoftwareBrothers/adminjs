import React from 'react'
import { Box, MadeWithLove } from '@adminjs/design-system'
import { useSelector } from 'react-redux'

import { BrandingOptions } from '../../../../adminjs-options.interface.js'
import allowOverride from '../../../hoc/allow-override.js'
import { ReduxState } from '../../../store/index.js'

const SidebarFooter: React.FC = () => {
  const branding = useSelector<ReduxState, BrandingOptions>((state) => state.branding)

  return (
    <Box mt="lg" mb="md" data-css="sidebar-footer">
      {branding.withMadeWithLove && <MadeWithLove />}
    </Box>
  )
}

export default allowOverride(SidebarFooter, 'SidebarFooter')
export { SidebarFooter as OriginalSidebarFooter, SidebarFooter }
