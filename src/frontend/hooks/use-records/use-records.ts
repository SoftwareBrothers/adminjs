import { useState, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import { useLocation, useNavigate } from 'react-router'
import { RecordJSON } from '../../interfaces/index.js'
import useNotice from '../use-notice.js'
import ApiClient from '../../utils/api-client.js'
import { ListActionResponse } from '../../../backend/actions/list/list-action.js'
import { hasForceRefresh, removeForceRefresh } from '../../components/actions/utils/append-force-refresh.js'
import { UseRecordsResult } from './use-records-result.type.js'

const api = new ApiClient()

/**
 * @load ./use-records.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 *
 * @param {string} resourceId      id of a resource for which you want to fetch records
 * @return {UseRecordsResult}
 * @bundle
 * @type {Function}
 */
function useRecords(resourceId: string): UseRecordsResult {
  const [records, setRecords] = useState<Array<RecordJSON>>([])
  const [loading, setLoading] = useState(false)
  const [perPage, setPerPage] = useState(10)
  const [page, setPage] = useState(1)
  const [total, setTotal] = useState(0)
  const [direction, setDirection] = useState<'asc'| 'desc'>('asc')
  const [sortBy, setSortBy] = useState<string | undefined>()
  const location = useLocation()
  const navigate = useNavigate()
  const addNotice = useNotice()
  const onNotice = useNotice()

  const fetchData = (): Promise<AxiosResponse<ListActionResponse>> => {
    setLoading(true)
    const query = new URLSearchParams(location.search)

    const promise = api.resourceAction({
      actionName: 'list', resourceId, params: query,
    }) as Promise<AxiosResponse<ListActionResponse>>

    promise.then((response) => {
      const listActionResponse = response.data as ListActionResponse
      if (listActionResponse.notice) {
        onNotice(listActionResponse.notice)
      }
      if (listActionResponse.redirectUrl) {
        navigate(listActionResponse.redirectUrl)
        return
      }

      setRecords(listActionResponse.records)
      setPage(listActionResponse.meta.page)
      setPerPage(listActionResponse.meta.perPage)
      setTotal(listActionResponse.meta.total)
      setDirection(listActionResponse.meta.direction)
      setSortBy(listActionResponse.meta.sortBy)
      setLoading(false)
    }).catch(() => {
      addNotice({
        message: 'errorFetchingRecords',
        type: 'error',
        resourceId,
      })
    })
    return promise
  }

  useEffect(() => {
    if (hasForceRefresh(location.search)) {
      navigate({
        pathname: location.pathname,
        search: removeForceRefresh(location.search).toString(),
      }, { replace: true })
    } else {
      fetchData()
    }
  }, [resourceId, location.search, location.state])

  return {
    records,
    loading,
    page,
    total,
    direction,
    sortBy,
    perPage,
    fetchData,
  }
}

export {
  useRecords as default,
  useRecords,
}
