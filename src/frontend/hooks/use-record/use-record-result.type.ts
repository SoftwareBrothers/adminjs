import { AxiosResponse } from 'axios'

import { OnPropertyChange } from '../../components/property-type/base-property-props'
import { RecordActionResponse } from '../../../backend/actions/action.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'


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
  submit: (customParams?: Record<string, string>) => Promise<AxiosResponse<RecordActionResponse>>;
  /**
   * Flag indicates loading.
   */
  loading: boolean;

  /**
   * Upload progress
   */
  progress: number;
}
