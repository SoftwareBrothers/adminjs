import { useState, useCallback, useEffect } from 'react'
import { AxiosResponse } from 'axios'
import ApiClient, { RecordActionAPIParams } from '../../utils/api-client'
import { RecordJSON } from '../../interfaces'
import recordToFormData from './record-to-form-data'
import useNotice from '../use-notice'
import { RecordActionResponse } from '../../../backend/actions/action.interface'
import mergeRecordResponse from './merge-record-response'
import updateRecord from './update-record'
import { UseRecordResult } from './use-record-result.type'
import isEntireRecordGiven from './is-entire-record-given'

const api = new ApiClient()

/**
 * @load ./use-record.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @bundle
 * @param {RecordJSON} [initialRecord],
 * @param {string} resourceId
 * @return {UseRecordResult}*
 */
export const useRecord = (
  initialRecord: RecordJSON | undefined,
  resourceId: string,
): UseRecordResult => {
  // setting up state
  const [loading, setLoading] = useState(false)
  const [progress, setProgress] = useState(0)
  const [record, setRecord] = useState<RecordJSON>({
    ...initialRecord,
    params: initialRecord?.params ?? {},
    errors: initialRecord?.errors ?? {},
    populated: initialRecord?.populated ?? {},
  } as RecordJSON)

  const onNotice = useNotice()

  useEffect(() => {
    if (initialRecord) {
      setRecord(initialRecord)
    }
  }, [initialRecord])

  const handleChange = useCallback((
    propertyOrRecord: RecordJSON | string,
    value?: any,
    incomingRecord?: RecordJSON,
  ): void => {
    if (isEntireRecordGiven(propertyOrRecord, value)) {
      setRecord(propertyOrRecord as RecordJSON)
    } else {
      setRecord(updateRecord(propertyOrRecord as string, value, incomingRecord))
    }
  }, [setRecord])

  const handleSubmit = useCallback((
    customParams: Record<string, string> = {},
  ): Promise<AxiosResponse<RecordActionResponse>> => {
    setLoading(true)

    const formData = recordToFormData(record)
    Object.entries(customParams).forEach(([key, value]) => formData.set(key, value))

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
      setRecord(prev => mergeRecordResponse(prev, response.data))
      setProgress(0)
      setLoading(false)
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
  }, [record, resourceId, setLoading, setProgress])

  return { record, handleChange, submit: handleSubmit, loading, progress }
}

export default useRecord
