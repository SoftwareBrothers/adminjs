import { useState, useEffect } from 'react'

import { AxiosResponse } from 'axios'
import { useLocation, useHistory } from 'react-router'
import { RecordJSON } from '../../interfaces'
import useNotice from '../use-notice'
import ApiClient from '../../utils/api-client'
import { ListActionResponse } from '../../../backend/actions/list/list-action'
import { useTranslation } from '../use-translation'
import { hasForceRefresh, removeForceRefresh } from '../../components/actions/utils/append-force-refresh'
import { UseRecordsResult } from './use-records-result.type'

const api = new ApiClient()

/**
 * @load ./use-records.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 *
 * @param {string} resourceId      id of a resource for which you want to fetch records
 * @return {UseRecordsResult}
 * @new In version 3.3
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
  const history = useHistory()
  const addNotice = useNotice()
  const { translateMessage } = useTranslation()
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
        history.push(listActionResponse.redirectUrl)
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
        message: translateMessage('errorFetchingRecords', resourceId),
        type: 'error',
      })
    })
    return promise
  }

  useEffect(() => {
    if (hasForceRefresh(location.search)) {
      history.replace([
        location.pathname, removeForceRefresh(location.search).toString(),
      ].join('?'))
    } else {
      fetchData()
    }
  }, [resourceId, location.search])

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
