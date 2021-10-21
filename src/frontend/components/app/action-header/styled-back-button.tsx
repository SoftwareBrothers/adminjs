import React from 'react'
import { useLocation } from 'react-router-dom'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers'
import { Icon } from '../../../customize/Icon'
import { StyledBackBtn } from '../../../customize/StyledBackBtn'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = StyledBackBtn
const h = new ViewHelpers()

export type StyledBackButtonProps = {
  resourceId: string;
  showInDrawer: boolean;
}

type LocationState = {
  [key: string]: string | number | undefined;
  previousPage?: string;
}

export const StyledBackButton: React.FC<StyledBackButtonProps> = (props) => {
  const { resourceId, showInDrawer } = props
  const location = useLocation()
  const cssCloseIcon = showInDrawer ? 'close' : 'arrow-left'

  const { previousPage } = (location.state || {}) as LocationState
  const previousPageUrl = previousPage ? new URL(previousPage) : null
  const backButtonUrl = previousPageUrl
    ? previousPageUrl.pathname + previousPageUrl.search
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
