import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink, useNavigate } from 'react-router-dom'
import {
  ButtonCSS,
  ButtonProps,
  Icon,
} from '@adminjs/design-system'

import allowOverride from '../../../hoc/allow-override'

// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({ rounded, ...rest }) => <RouterLink {...rest} />) <ButtonProps>`${ButtonCSS}`

const StyledBackButton: React.FC = () => {
  const navigate = useNavigate()

  return (
    <StyledLink
      size="icon"
      to={navigate(-1)}
      rounded
      mr="lg"
      type="button"
    >
      <Icon icon="X" />
    </StyledLink>
  )
}

const OverridableStyledBackButton = allowOverride(StyledBackButton, 'StyledBackButton')

export {
  OverridableStyledBackButton as default,
  OverridableStyledBackButton as StyledBackButton,
}
