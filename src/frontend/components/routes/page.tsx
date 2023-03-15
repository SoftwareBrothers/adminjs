import { InfoBox, Text } from '@adminjs/design-system'
import React, { FC, useMemo } from 'react'
import { Trans } from 'react-i18next'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import allowOverride from '../../hoc/allow-override.js'
import withNoSSR from '../../hoc/with-no-ssr.js'
import { useTranslation } from '../../hooks/index.js'
import { ReduxState } from '../../store/store.js'
import ErrorBoundary from '../app/error-boundary.js'

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
      <InfoBox title={tm('pageNotFound_title')} illustration="NotFound">
        <Text mb="xxl">
          <Trans i18nKey="messages.pageNotFound_subtitle" values={{ pageName }} components={{ strong: <strong /> }} />
        </Text>
      </InfoBox>
    )
  }

  const Component = AdminJS.UserComponents[currentPage.component]

  if (!Component) {
    return (
      <InfoBox title={tm('componentNotFound_title')} illustration="Beware">
        <Text mb="xxl">
          <Trans i18nKey="messages.componentNotFound_subtitle" />
        </Text>
      </InfoBox>
    )
  }

  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  )
}

export default allowOverride(withNoSSR(Page), 'PageRoute')
