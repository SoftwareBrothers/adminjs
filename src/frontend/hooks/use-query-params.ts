/* eslint-disable no-unused-vars */
import isEmpty from 'lodash/isEmpty.js'
import pick from 'lodash/pick.js'
import { parse, stringify } from 'qs'
import { useCallback, useMemo } from 'react'
import { useSearchParams } from 'react-router-dom'

// eslint-disable-next-line no-shadow
export enum QueryParams {
  Tab = 'tab',
  Redirect = 'redirectUrl',
  Refresh = 'refresh',
}

// eslint-disable-next-line no-shadow
export enum QueryListParams {
  Page = 'page',
  SortBy = 'sortBy',
  Direction = 'direction',
  Filters = 'filters',
  Query = 'query',
}

type Params<FiltersT = Record<string, unknown>> = {
  sortBy: string
  page: string
  tab: string
  redirectUrl: string
  direction: 'asc' | 'desc'
  filters: FiltersT
  [name: string]: unknown
}

export function useQueryParams<FiltersT = Record<string, unknown>>() {
  const [searchParams, setSearchParams] = useSearchParams()

  const parsedQuery = useMemo(
    () => parse(searchParams.toString()) as Params<FiltersT>,
    [searchParams],
  )
  const { sortBy, direction, page, tab, filters, redirectUrl } = parsedQuery
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

  const storeParams = useCallback((params: Partial<Params>) => {
    const newQuery = { sortBy, direction, page, tab, filters, redirectUrl, ...params }
    return setSearchParams(stringify(newQuery, { skipNulls: true, allowDots: true }))
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
