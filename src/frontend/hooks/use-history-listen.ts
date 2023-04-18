import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useLocation } from 'react-router'

import { useLocalStorage } from '../hooks/use-local-storage/index.js'
import { ReduxState, RouterInState } from '../store/index.js'
import { changeRoute, initializeRoute } from '../store/actions/route-changed.js'

const useHistoryListen = (): void => {
  const location = useLocation()
  const [storedPath, setStoredPath] = useLocalStorage<Partial<typeof location>>('prevPage', {})
  const { to = {}, from = {} } = useSelector<ReduxState, RouterInState>((state) => state.router)
  const dispatch = useDispatch()

  useEffect(() => {
    if (storedPath) {
      dispatch(initializeRoute(storedPath))
    }
  }, [])

  useEffect(() => {
    const previousPath = [to.pathname, to.search].join('')
    const currentPath = [location.pathname, location.search].join('')

    if (previousPath !== currentPath) {
      dispatch(changeRoute(location))
    }
  }, [location])

  useEffect(() => {
    if (from.pathname) {
      setStoredPath(from)
    }
  }, [from])
}

export {
  useHistoryListen,
  useHistoryListen as default,
}
