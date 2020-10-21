import { AxiosResponse } from 'axios'
import { ListActionResponse } from '../../../backend'
import { RecordJSON } from '../../interfaces'

export type UseRecordsResult = {
  records: Array<RecordJSON>;
  loading: boolean;
  page: number;
  perPage: number;
  total: number;
  direction: 'asc' | 'desc';
  sortBy?: string;
  fetchData: () => Promise<AxiosResponse<ListActionResponse>>;
}
