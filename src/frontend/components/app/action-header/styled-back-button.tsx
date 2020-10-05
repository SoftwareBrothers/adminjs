import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import {
  ButtonCSS,
  ButtonProps,
  Icon,
} from '@admin-bro/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({ rounded, ...rest }) => <RouterLink {...rest} />)<ButtonProps>`${ButtonCSS}`
const h = new ViewHelpers()

export type StyledBackButtonProps = {
  resourceId: string;
  showInDrawer: boolean;
}

export const StyledBackButton: React.FC<StyledBackButtonProps> = (props) => {
  const { resourceId, showInDrawer } = props
  const cssCloseIcon = showInDrawer ? 'ChevronRight' : 'ChevronLeft'

  return (
    <StyledLink
      size="icon"
      to={h.resourceUrl({ resourceId, search: window.location.search })}
      rounded
      mr="lg"
      type="button"
    >
      <Icon icon={cssCloseIcon} />
    </StyledLink>
  )
}
