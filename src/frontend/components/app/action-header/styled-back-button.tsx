import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink } from 'react-router-dom'
import {
  ButtonCSS,
  ButtonProps,
  Icon,
} from '@adminjs/design-system'

import { useSelector } from 'react-redux'
import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers'
import { ReduxState, RouterProps } from '../../../store'


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

  const { from } = useSelector<ReduxState, RouterProps>(state => state.router)
  const { pathname, search } = from

  const backButtonUrl = pathname
    ? [pathname, search].join('')
    : h.resourceUrl({ resourceId, search: window.location.search })


  return (
    <StyledLink
      size="icon"
      to={backButtonUrl}
      rounded
      mr="lg"
      type="button"
    >
      <Icon icon={cssCloseIcon} />
    </StyledLink>
  )
}
