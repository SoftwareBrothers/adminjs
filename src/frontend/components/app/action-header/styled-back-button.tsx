import React from 'react'
import { Link as RouterLink } from 'react-router-dom'
import { useLocation } from 'react-router'
import {
  ButtonCSS,
  ButtonProps,
  Icon,
} from '@adminjs/design-system'
import { styled } from '@adminjs/design-system/styled-components'

import allowOverride from '../../../hoc/allow-override.js'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({ rounded, to, ...rest }) => <RouterLink to={to} {...rest} />)<ButtonProps>`${ButtonCSS}`

export type StyledBackButtonProps = {
  showInDrawer: boolean;
}

const StyledBackButton: React.FC<StyledBackButtonProps> = (props) => {
  const location = useLocation()
  const { showInDrawer } = props
  const cssCloseIcon = showInDrawer ? 'ChevronRight' : 'ChevronLeft'

  return (
    <StyledLink
      size="icon"
      to={{
        pathname: '..',
        search: location.search,
      }}
      relative="route"
      rounded
      mr="lg"
      type="button"
    >
      <Icon icon={cssCloseIcon} />
    </StyledLink>
  )
}

const OverridableStyledBackButton = allowOverride(StyledBackButton, 'StyledBackButton')

export {
  OverridableStyledBackButton as default,
  OverridableStyledBackButton as StyledBackButton,
  StyledBackButton as OriginalStyledBackButton,
}
