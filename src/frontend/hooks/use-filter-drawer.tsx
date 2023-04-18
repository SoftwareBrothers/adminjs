import { useDispatch, useSelector } from 'react-redux'
import { useEffect, useState } from 'react'
import { hideFilterDrawer, showFilterDrawer } from '../store/actions/filter-drawer.js'
import { ReduxState } from '../store/index.js'
import { useQueryListParams } from './use-query-list-params.js'

export const useFilterDrawer = () => {
  const [filtersCount, setFiltersCount] = useState(0)
  const dispach = useDispatch()
  const isVisible = useSelector((state: ReduxState) => state.filterDrawer.isVisible)

  const { showFilters, filters = {} } = useQueryListParams()

  useEffect(() => {
    setFiltersCount(Object.keys(filters).length)
  }, [filters])

  useEffect(() => {
    if (showFilters) {
      dispach(showFilterDrawer())
    }
  }, [showFilters])

  const toggleFilter = () => {
    dispach(isVisible ? hideFilterDrawer() : showFilterDrawer())
  }

  return { filtersCount, isVisible, toggleFilter }
}
