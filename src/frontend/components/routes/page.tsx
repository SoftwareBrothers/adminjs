import React, { FunctionComponent, useState, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router'

import ErrorBoundary from '../app/error-boundary'
import { ReduxState } from '../../store/store'
import ErrorMessageBox from '../app/error-message'
import allowOverride from '../../hoc/allow-override'

declare const AdminJS: {
  UserComponents: Record<string, FunctionComponent>;
}

type PageRouteProps = {
  pageName: string;
}

const Page: React.FC = () => {
  const [pages] = useSelector((state: ReduxState) => [state.pages])
  const params = useParams<PageRouteProps>()
  const { pageName } = params
  const [isClient, setIsClient] = useState(false)

  const currentPage = pages.find((page) => page.name === pageName)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!currentPage) {
    return (
      <ErrorMessageBox title="There is no page of given name">
        <p>
          Page:
          <b>{` "${pageName}" `}</b>
          does not exist.
        </p>
      </ErrorMessageBox>
    )
  }

  const Component = AdminJS.UserComponents[currentPage.component]

  if (!Component || !isClient) {
    return (
      <ErrorMessageBox title="No component specified">
        <p>You have to specify component which will render this Page</p>
      </ErrorMessageBox>
    )
  }

  return (
    <ErrorBoundary>
      <Component />
    </ErrorBoundary>
  )
}

export default allowOverride(Page, 'PageRoute')
