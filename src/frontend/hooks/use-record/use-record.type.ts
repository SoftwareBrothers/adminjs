import { AxiosResponse } from 'axios'

import { OnPropertyChange } from '../../components/property-type/base-property-props'
import { RecordActionResponse } from '../../../backend/actions/action.interface'
import { RecordJSON } from '../../interfaces'

/**
 * Custom options passed to useRecord
 *
 * @memberof useRecord
 * @alias UseRecordOptions
 */
export type UseRecordOptions = {
  /**
   * If set, useRecord will operates only on selected params. The rules here will be applied to
   * both initialRecord params and all the params set by handleChange. It wont be applied to params
   * set in submit
   */
  includeParams?: Array<string>;
}

/**
 * Custom options passed to useRecord
 *
 * @memberof useRecord
 * @alias UseRecordSubmitOptions
 */
export type UseRecordSubmitOptions = {
  /**
   * Indicates if record should be updated after the submit action, which returns updated record.
   * You might turn this of if you use function like lodash debounce, where you might have old
   * state in the action response.
   */
  updateOnSave?: boolean;
}

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
   * If custom params are given as an argument - they are merged
   * to the payload.
   */
  submit: (
    customParams?: Record<string, string>,
    options?: UseRecordSubmitOptions
  ) => Promise<AxiosResponse<RecordActionResponse>>;
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
