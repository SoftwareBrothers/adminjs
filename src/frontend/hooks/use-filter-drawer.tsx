import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { hideFilterDrawer, showFilterDrawer } from '../store/actions/filter-drawer.js'
import { ReduxState } from '../store/index.js'
import { useQueryParams } from './use-query-params.js'

export const useFilterDrawer = () => {
  const [filtersCount, setFiltersCount] = useState(0)
  const dispatch = useDispatch()
  const isVisible = useSelector((state: ReduxState) => state.filterDrawer.isVisible)

  const { filters = {} } = useQueryParams()

  useEffect(() => {
    setFiltersCount(Object.keys(filters).length)
  }, [filters])

  const toggleFilter = () => {
    dispatch(isVisible ? hideFilterDrawer() : showFilterDrawer())
  }

  const open = () => {
    dispatch(showFilterDrawer())
  }

  const close = () => {
    dispatch(hideFilterDrawer())
  }

  return {
    filtersCount,
    isVisible,
    toggleFilter,
    open,
    close,
  }
}
