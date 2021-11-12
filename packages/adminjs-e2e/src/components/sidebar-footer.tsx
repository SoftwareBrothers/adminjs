import React from 'react'

const SidebarFooter: React.FC = ({ OriginalComponent }) => (
  <>
    <OriginalComponent />
    <div data-testid="sidebarFooterOverride">Custom Sidebar element</div>
  </>
)

export default SidebarFooter
