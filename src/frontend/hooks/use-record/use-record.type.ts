import { AxiosResponse } from 'axios'

import { OnPropertyChange } from '../../components/property-type/base-property-props'
import { RecordActionResponse } from '../../../backend/actions/action.interface'
import { RecordJSON } from '../../interfaces'

/**
 * Custom options passed to useRecord as the third argument.
 *
 * Example of restricting useRecord to operate only on a finite set of properties:
 *
 * ```javascript
 * const { record, handleChange, submit } = useRecord(initialRecord, resource.id, {
 *   includeParams: ['name', 'surname', 'school.name'],
 * })
 *
 * // handleChange('otherProperty', 'value') wont affect the `record`
 * ```
 *
 * @memberof useRecord
 * @alias UseRecordOptions
 */
export type UseRecordOptions = {
  /**
   * If set, useRecord will operate only on selected params. The rules here will be applied to
   * both initialRecord params and all the params set by handleChange. It wont be applied to params
   * set in submit
   */
  includeParams?: Array<string>;
}

/**
 * Submit function which either creates a record or updates it. By default, after successful
 * execution function updates its inner state with the returned by the backend record. This might
 * not be the need in your case, so you can turn it of by setting `updateOnSave` to false.
 *
 * @memberof useRecord
 * @alias UseRecordSubmitFunction
 * @param {boolean} [options.updateOnSave] Indicates if record should be updated after the
 *                                         submit action, which returns updated record.
 *                                         You might turn this of if you use function like lodash
 *                                         debounce, where you might have old
 *                                         state in the action response.
 */
export type UseRecordSubmitFunction = (
  /**
   * Any additional parameters you want to be merged to the payload.
   */
  customParams?: Record<string, string>,
  /**
   * Custom options passed to submit function
   */
  options?: {
    updateOnSave?: boolean;
  }
) => Promise<AxiosResponse<RecordActionResponse>>;

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
  handleChange: OnPropertyChange;
  /**
   * Triggers submission of the record. Returns a promise.
   */
  submit: UseRecordSubmitFunction;
  /**
   * Flag indicates loading.
   */
  loading: boolean;

  /**
   * Upload progress
   */
  progress: number;

  /**
   * Sets value for the record from the outside. You might use it when you update the record
   * simultaneously in an another place.
   */
  setRecord: React.Dispatch<React.SetStateAction<RecordJSON>>;

  /**
   * Indicates if record is in "synced" state. It is when it was either just created from initial
   * record or submitted. After at least one handleChange it is false until the successful submit
   */
  isSynced: boolean;
}
