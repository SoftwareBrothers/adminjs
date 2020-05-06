import { useState, useEffect } from 'react'

import { AxiosResponse } from 'axios'
import { useLocation, useHistory } from 'react-router'
import RecordJSON from '../../backend/decorators/record-json.interface'
import useNotice from './use-notice'
import ApiClient from '../utils/api-client'
import { ListActionResponse } from '../../backend/actions/list-action'
import { useTranslation } from './use-translation'
import { hasForceRefresh, removeForceRefresh } from '../components/actions/utils/append-force-refresh'

const api = new ApiClient()

export type UseRecordsResult = {
  records: Array<RecordJSON>;
  loading: boolean;
  page: number;
  total: number;
  direction: 'asc' | 'desc';
  sortBy?: string;
  fetchData: () => Promise<AxiosResponse<ListActionResponse>>;
}


export const useRecords = (resourceId: string): UseRecordsResult => {
  const [records, setRecords] = useState<Array<RecordJSON>>([])
  const [loading, setLoading] = useState(false)
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
    fetchData,
  }
}

export default useRecords
