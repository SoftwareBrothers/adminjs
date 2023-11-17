import React from 'react'

import allowOverride from '../../hoc/allow-override.js'

const AuthenticationBackgroundComponent: React.FC = () => null

const OverridableAuthenticationBackgroundComponent = allowOverride(AuthenticationBackgroundComponent, 'AuthenticationBackgroundComponent')

export {
  OverridableAuthenticationBackgroundComponent as default,
  OverridableAuthenticationBackgroundComponent as AuthenticationBackgroundComponent,
  AuthenticationBackgroundComponent as OriginalAuthenticationBackgroundComponent,
}
