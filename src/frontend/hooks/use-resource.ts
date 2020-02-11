import { useState } from 'react'
import { AxiosResponse } from 'axios'
import ApiClient from '../utils/api-client'
import RecordJSON from '../../backend/decorators/record-json.interface'
import recordToFormData from '../components/actions/record-to-form-data'
import useNotice from './use-notice'
import { RecordActionResponse } from '../../backend/actions/action.interface'

const api = new ApiClient()

export type UseResourceResult = {
  record: RecordJSON;
  handleChange: (propertyOrRecord: string | RecordJSON, value?: any) => void;
  handleSubmit: () => Promise<AxiosResponse<RecordActionResponse>>;
  loading: boolean;
}

/**
 * @component
 */
export const useResource = (
  initialRecord: RecordJSON | undefined,
  resourceId: string,
): UseResourceResult => {
  const [loading, setLoading] = useState(false)
  const [record, setRecord] = useState<RecordJSON>({
    ...initialRecord,
    params: initialRecord?.params ?? {},
    errors: initialRecord?.errors ?? {},
    populated: initialRecord?.populated ?? {},
  } as RecordJSON)

  const onNotice = useNotice()

  const handleChange = (
    propertyOrRecord: RecordJSON | string,
    value?: any,
  ): void => {
    if (
      typeof value === 'undefined'
      && !(typeof propertyOrRecord === 'string')
      && propertyOrRecord.params
    ) {
      setRecord(propertyOrRecord)
    } else {
      setRecord(prev => ({
        ...prev,
        params: { ...prev.params, [propertyOrRecord as string]: value },
      }))
    }
  }

  const handleSubmit = (): Promise<AxiosResponse<RecordActionResponse>> => {
    setLoading(true)
    const formData = recordToFormData(record)
    const promise = record.id
      ? api.recordAction({
        resourceId,
        actionName: 'edit',
        recordId: record.id,
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      })
      : api.resourceAction({
        resourceId,
        actionName: 'new',
        data: formData,
        headers: { 'Content-Type': 'multipart/form-data' },
      }) as Promise<AxiosResponse<RecordActionResponse>>

    promise.then((response) => {
      if (response.data.notice) {
        onNotice(response.data.notice)
      }
      setRecord(prev => ({
        ...response.data.record,
        errors: response.data.record.errors,
        populated: { ...prev.populated, ...response.data.record.populated },
        params: { ...prev.params, ...response.data.record.params },
      }))
      setLoading(false)
    }).catch(() => {
      onNotice({
        message:
        'There was an error updating record, Check out console to see more information.',
        type: 'error',
      })
      setLoading(false)
    })
    return promise
  }

  return { record, handleChange, handleSubmit, loading }
}

export default useResource
