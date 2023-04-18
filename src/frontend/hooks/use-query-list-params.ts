/* eslint-disable no-unused-vars */
import isEmpty from 'lodash/isEmpty.js'
import pick from 'lodash/pick.js'
import { parse, stringify } from 'qs'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

// eslint-disable-next-line no-shadow
export enum QueryListParams {
  Page = 'page',
  SortBy = 'sortBy',
  Direction = 'direction',
  Filters = 'filters',
  Tab = 'tab',
  Query = 'query',
  Redirect = 'redirectUrl',
  Refresh = 'refresh',
}

type ListParamsQuery = Record<QueryListParams, string> & {
  direction: 'asc' | 'desc'
}

export function useQueryListParams<FiltersT = Record<string, unknown>>() {
  const [searchParams, setSearchParams] = useSearchParams()

  const parsedQuery = useMemo(
    () => parse(searchParams.toString()) as ListParamsQuery,
    [searchParams],
  )
  const { sortBy, direction, page, tab, filters, query, redirectUrl } = parsedQuery
  const showFilters = !isEmpty(filters)
  const listParams = useMemo(
    () => pick(parsedQuery, [
      QueryListParams.SortBy,
      QueryListParams.Filters,
      QueryListParams.Direction,
      QueryListParams.Page,
      QueryListParams.Query,
    ]),
    [parsedQuery],
  )

  const storeParams = useCallback((params: Partial<ListParamsQuery>) => {
    const newQuery = { tab, filters, sortBy, direction, page, query, ...params }
    return setSearchParams(stringify(newQuery, { skipNulls: true }))
  }, [])

  return {
    showFilters,
    parsedQuery,
    listParams,
    filters: filters as unknown as FiltersT,
    sortBy,
    direction,
    page,
    tab,
    storeParams,
    redirectUrl,
  }
}
