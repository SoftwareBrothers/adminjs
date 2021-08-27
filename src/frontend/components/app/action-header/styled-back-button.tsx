import React from 'react'
import styled from 'styled-components'
import { Link as RouterLink, useHistory, useLocation } from 'react-router-dom'
import {
  ButtonCSS,
  ButtonProps,
  Icon,
} from '@adminjs/design-system'

import ViewHelpers from '../../../../backend/utils/view-helpers/view-helpers'


// eslint-disable-next-line @typescript-eslint/no-unused-vars
const StyledLink = styled(({ rounded, ...rest }) => <RouterLink {...rest} />)<ButtonProps>`${ButtonCSS}`
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
  const history = useHistory()
  const location = useLocation()
  const [backButtonUrl, setBackButtonUrl] = React.useState(
    h.resourceUrl({ resourceId, search: window.location.search }),
  )
  const cssCloseIcon = showInDrawer ? 'ChevronRight' : 'ChevronLeft'

  React.useEffect(() => {
    let previousPageUrl
    if (history.action === 'PUSH') {
      const { previousPage } = location.state as LocationState
      previousPageUrl = previousPage ? new URL(previousPage) : null
    }

    if (previousPageUrl) {
      setBackButtonUrl(previousPageUrl.pathname + previousPageUrl.search)
    }
  }, [history.action])

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
