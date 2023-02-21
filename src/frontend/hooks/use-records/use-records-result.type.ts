import { AxiosResponse } from 'axios'

import { ListActionResponse } from '../../../backend/index.js'
import { RecordJSON } from '../../interfaces/index.js'

/**
 * Result of the {@link useRecords} hook.
 * It is a object containing multiple tools you can use in your component
 * @memberof useRecords
 * @alias UseRecordsResult
 */
export type UseRecordsResult = {
  /**
   * Array of records fetched from the backend
   */
  records: Array<RecordJSON>;
  /** loading state */
  loading: boolean;
  /** current page (in pagination) */
  page: number;
  /** perPage limit returned by the backend */
  perPage: number;
  /** total number of pages in for current query */
  total: number;
  /** sort direction */
  direction: 'asc' | 'desc';
  /** field used as a sortBy column */
  sortBy?: string;
  /** function which triggers fetching the data */
  fetchData: () => Promise<AxiosResponse<ListActionResponse>>;
}
