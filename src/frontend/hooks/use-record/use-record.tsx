import { useState, useCallback, Dispatch, SetStateAction } from 'react'
import { AxiosResponse } from 'axios'
import ApiClient, { RecordActionAPIParams } from '../../utils/api-client'
import { RecordJSON } from '../../interfaces'
import { paramsToFormData } from './params-to-form-data'
import useNotice from '../use-notice'
import { RecordActionResponse } from '../../../backend/actions/action.interface'
import mergeRecordResponse from './merge-record-response'
import updateRecord from './update-record'
import { UseRecordOptions, UseRecordResult, UseRecordSubmitFunction } from './use-record.type'
import isEntireRecordGiven from './is-entire-record-given'
import { filterRecordParams, isPropertyPermitted } from './filter-record'
import { flat } from '../../../utils'

const api = new ApiClient()

/**
 * @load ./use-record.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @bundle
 * @param {RecordJSON} [initialRecord],
 * @param {string} resourceId
 * @param {UseRecordOptions} [options]
 * @return {UseRecordResult}
 */
export const useRecord = (
  initialRecord: RecordJSON | undefined,
  resourceId: string,
  options?: UseRecordOptions,
): UseRecordResult => {
  // setting up state
  const [loading, setLoading] = useState(false)
  const [isSynced, setIsSynced] = useState(true)
  const [progress, setProgress] = useState(0)

  const filteredRecord = initialRecord ? filterRecordParams(initialRecord, options) : null

  const [record, setRecord] = useState<RecordJSON>({
    ...filteredRecord,
    params: filteredRecord?.params ?? {},
    errors: initialRecord?.errors ?? {},
    populated: initialRecord?.populated ?? {},
  } as RecordJSON)

  // it keeps the same format as useState function which can take either value or function
  const setFilteredRecord: Dispatch<SetStateAction<RecordJSON>> = useCallback((value) => {
    const newRecord = value instanceof Function ? value(record) : value
    setRecord(filterRecordParams(newRecord, options))
  }, [options, record])

  const onNotice = useNotice()

  const handleChange = useCallback((
    propertyOrRecord: RecordJSON | string,
    value?: any,
    incomingRecord?: RecordJSON,
  ): void => {
    if (isEntireRecordGiven(propertyOrRecord, value)) {
      setFilteredRecord(propertyOrRecord as RecordJSON)
    } else if (isPropertyPermitted(propertyOrRecord as string, options)) {
      setRecord(updateRecord(propertyOrRecord as string, value, incomingRecord))
    } else if (process.env.NODE_ENV === 'development') {
      // eslint-disable-next-line no-console
      console.warn([
        `You are trying to set property: "${propertyOrRecord as string}" which`,
        'is not permitted. Take a look at `useRecord(..., { includeParams: [...]})`',
      ].join('\n'))
    }
    setIsSynced(false)
  }, [setRecord, options])

  const handleSubmit: UseRecordSubmitFunction = useCallback((
    customParams = {}, submitOptions,
  ): Promise<AxiosResponse<RecordActionResponse>> => {
    setLoading(true)

    const mergedParams = flat.merge(record.params, customParams)
    const formData = paramsToFormData(mergedParams)

    const params: Omit<RecordActionAPIParams, 'actionName' | 'recordId'> = {
      resourceId,
      onUploadProgress: (e): void => setProgress(Math.round((e.loaded * 100) / e.total)),
      data: formData,
      headers: { 'Content-Type': 'multipart/form-data' },
    }

    const promise = record.id
      ? api.recordAction({
        ...params,
        actionName: 'edit',
        recordId: record.id,
      })
      : api.resourceAction({
        ...params,
        actionName: 'new',
      }) as Promise<AxiosResponse<RecordActionResponse>>

    promise.then((response) => {
      if (response.data.notice) {
        onNotice(response.data.notice)
      }
      if (submitOptions?.updateOnSave !== false) {
        setFilteredRecord(prev => mergeRecordResponse(prev, response.data))
      }
      setProgress(0)
      setLoading(false)
      setIsSynced(true)
    }).catch(() => {
      onNotice({
        message:
        'There was an error updating record, Check out console to see more information.',
        type: 'error',
      })
      setProgress(0)
      setLoading(false)
    })
    return promise
  }, [record, resourceId, setLoading, setProgress, setRecord])

  return {
    record,
    handleChange,
    submit: handleSubmit,
    loading,
    progress,
    setRecord: setFilteredRecord,
    isSynced,
  }
}

export default useRecord
