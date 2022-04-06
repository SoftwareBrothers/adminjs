import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'
import { ReduxState, RouterProps } from '../store'
import { changeRoute } from '../store/actions/route-changed'

const useHistoryListen = (): void => {
  const location = useLocation()
  const { to = {} } = useSelector<ReduxState, RouterProps>(state => state.router)
  const dispatch = useDispatch()

  useEffect(() => {
    const previousPath = [to.pathname, to.search].join('')
    const currentPath = [location.pathname, location.search].join('')

    if (previousPath !== currentPath) {
      dispatch(changeRoute(location))
    }
  }, [location])
}

export default useHistoryListen
