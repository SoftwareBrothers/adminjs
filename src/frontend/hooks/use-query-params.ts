/* eslint-disable no-unused-vars */
import pick from 'lodash/pick.js'
import { parse, stringify } from 'qs'
import { useMemo } from 'react'
import { useLocation, useSearchParams } from 'react-router-dom'

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

type Params<ParamsT = Record<string, unknown>, FiltersT = Record<string, unknown>> = ParamsT & {
  sortBy: string
  page: string
  tab: string
  redirectUrl: string
  direction: 'asc' | 'desc'
  filters: FiltersT
  refresh: boolean
}

export function useQueryParams<
  ParamsT = Record<string, unknown>,
  FiltersT = Record<string, unknown>,
>() {
  const { pathname } = useLocation()
  const [searchParams, setSearchParams] = useSearchParams()

  const parsedQuery = useMemo(
    () => parse(searchParams.toString(), {
      allowDots: true,
    }) as unknown as Params<ParamsT, FiltersT>,
    [searchParams, pathname],
  )
  const { sortBy, direction, page, tab, filters, redirectUrl } = parsedQuery
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

  function storeParams(params: Partial<Params<ParamsT, FiltersT>>) {
    setSearchParams(
      stringify(
        { sortBy, direction, page, tab, filters, redirectUrl, ...params },
        { allowDots: true },
      ),
    )
  }

  function clearParams(...params: string[]) {
    const searchParamsKeys = Array.from(searchParams.keys())
    const clearCandidates = params.length ? params : searchParamsKeys

    for (const param of searchParamsKeys) {
      for (const paramToClear of clearCandidates) {
        if (param.startsWith(paramToClear) && searchParams.get(param)) {
          searchParams.delete(param)
        }
      }
    }

    setSearchParams(searchParams)
  }

  function getParam(param: keyof Params<ParamsT, FiltersT> & string) {
    searchParams.get(param)
  }

  return {
    parsedQuery,
    listParams,
    filters: filters as unknown as FiltersT,
    sortBy,
    direction,
    page,
    tab,
    redirectUrl,
    storeParams,
    clearParams,
    getParam,
  }
}
