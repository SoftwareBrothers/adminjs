import { Box, InfoBox, Text } from '@adminjs/design-system'
import React, { FC, useMemo } from 'react'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import allowOverride from '../../hoc/allow-override'
import withNoSSR from '../../hoc/with-no-ssr'
import { useTranslation } from '../../hooks'
import { ReduxState } from '../../store/store'
import ErrorBoundary from '../app/error-boundary'

declare const AdminJS: {
  UserComponents: Record<string, FC>;
}

type PageRouteProps = {
  pageName: string;
}

const Page: FC = () => {
  const pages = useSelector((state: ReduxState) => state.pages)
  const params = useParams<PageRouteProps>()
  const { pageName } = params
  const { tm } = useTranslation()

  const currentPage = useMemo(() => pages.find(({ name }) => name === pageName), [pages, pageName])

  if (!currentPage) {
    return (
      <Box flex alignItems="center" justifyContent="center" height="100%">
        <InfoBox title={tm('pageNotFound_title')} illustration="NotFound">
          <Text mb="xxl">
            <Trans i18nKey="messages.pageNotFound_subtitle" values={{ pageName }} components={{ strong: <strong /> }} />
          </Text>
        </InfoBox>
      </Box>
    )
  }

  const Component = AdminJS.UserComponents[currentPage.component]

  if (!Component) {
    return (
      <Box flex alignItems="center" justifyContent="center" height="100%">
        <InfoBox title={tm('componentNotFound_title')} illustration="Beware">
          <Text mb="xxl">
            <Trans i18nKey="messages.componentNotFound_subtitle" />
          </Text>
        </InfoBox>
      </Box>
    )
  }

  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  )
}

export default allowOverride(withNoSSR(Page), 'PageRoute')
