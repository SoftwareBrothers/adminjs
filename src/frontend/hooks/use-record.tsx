import { useState } from 'react'
import { AxiosResponse } from 'axios'
import ApiClient from '../utils/api-client'
import RecordJSON from '../../backend/decorators/record-json.interface'
import recordToFormData from '../components/actions/record-to-form-data'
import useNotice from './use-notice'
import { RecordActionResponse } from '../../backend/actions/action.interface'

const api = new ApiClient()

/**
 * Result of useRecord hook
 * 
 * @memberof useRecord
 * @alias UseRecordResult
 */
export type UseRecordResult = {
  /**
   * recordJSON instance for given resource.
   */
  record: RecordJSON;
  /**
   * Function compatible with onChange method supported by all the components wrapped by
   * {@link BasePropertyComponent}.
   */
  handleChange: (propertyOrRecord: string | RecordJSON, value?: any) => void;
  /**
   * Triggers submission of the record. Returns a promise.
   */
  submit: () => Promise<AxiosResponse<RecordActionResponse>>;
  /**
   * Flag indicates loading.
   */
  loading: boolean;
}

/**
 * A powerful, hook which allows you to manage an entire record of given type.
 * 
 * Take a look of creating a component which renders form for some non-existing record.
 * Form have name and surname fields. After clicking "save" user will create a new record.
 * Consecutive calls will update it.
 * 
 * ```javascript
 * import { BasePropertyComponent, useRecord, Box, useTranslation } from 'admin-bro'
 * 
 * const MyRecordActionComponent = (props) => {
 *   const { record: initialRecord, resource, action } = props
 * 
 *   const { record, handleChange, submit } = useRecord(initialRecord, resource.id)
 *   const { translateButton } = useTranslation()
 * 
 *   const nameProperty = resource.editProperties.find((property) => property.name === 'name')
 *   const surnameProperty = resource.editProperties.find((property) => property.name === 'surname')
 * 
 *   const handleSubmit = (event) => {
 *     submit().then(() => {
 *        // do something
 *     })
 *   }
 * 
 *   return (
 *     <Box
 *       as="form"
 *       onSubmit={handleSubmit}
 *     >
 *       <BasePropertyComponent
 *         where="edit"
 *         onChange={handleChange}
 *         property={nameProperty}
 *         resource={resource}
 *         record={record}
 *       />
 *       <BasePropertyComponent
 *         where="edit"
 *         onChange={handleChange}
 *         property={surnameProperty}
 *         resource={resource}
 *         record={record}
 *       />
 *       <Button variant="primary" size="lg">
 *         {translateButton('save', resource.id)}
 *       </Button>
 *     </Box>
 *   )
 * }
 * export default MyRecordActionComponent
 * ```
 * 
 * Returns {@link UseRecordResult}.
 * 
 * @subcategory Hooks
 * @component
 */
export const useRecord = (
  initialRecord: RecordJSON | undefined,
  resourceId: string,
): UseRecordResult => {
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

  return { record, handleChange, submit: handleSubmit, loading }
}

export default useRecord
