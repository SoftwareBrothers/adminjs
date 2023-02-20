import React, { useMemo } from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import {
  ButtonCSS,
  ButtonProps,
  Icon,
} from '@adminjs/design-system'
import { useSelector } from 'react-redux'

import allowOverride from '../../../hoc/allow-override'
import { DrawerProps, ReduxState, RouterProps } from '../../../store'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({ rounded, ...rest }) => <RouterLink {...rest} />)<ButtonProps>`${ButtonCSS}`

export type StyledBackButtonProps = {
  showInDrawer: boolean;
}

const StyledBackButton: React.FC<StyledBackButtonProps> = (props) => {
  const { showInDrawer } = props
  const { previousRoute } = useSelector<ReduxState, DrawerProps>((state) => state.drawer)
  const { from = {} } = useSelector<ReduxState, RouterProps>((state) => state.router)
  const cssCloseIcon = showInDrawer ? 'ChevronRight' : 'ChevronLeft'

  const backLink = useMemo(() => {
    if (!showInDrawer) {
      return from?.pathname
    }

    if (previousRoute?.pathname) {
      return previousRoute?.pathname
    }

    return from?.pathname
  }, [previousRoute, from])

  return (
    <StyledLink
      size="icon"
      to={backLink}
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
}
