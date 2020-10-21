import { RecordJSON } from '../../interfaces'

export type UseSelectedRecordsResult = {
  selectedRecords: Array<RecordJSON>;
  setSelectedRecords: any;
  handleSelect: (record: RecordJSON) => void;
  handleSelectAll: () => void;
}
