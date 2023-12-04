import React from 'react'

import allowOverride from '../../hoc/allow-override.js'

const Footer: React.FC = () => null

const OverridableFooter = allowOverride(Footer, 'Footer')

export {
  OverridableFooter as default,
  OverridableFooter as Footer,
  Footer as OriginalFooter,
}
