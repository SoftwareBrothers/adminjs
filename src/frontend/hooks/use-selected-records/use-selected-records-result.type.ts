import { RecordJSON } from '../../interfaces'

/**
 * Result of the {@link useSelectedRecords} hook.
 * It is a object containing multiple tools you can use in your component
 * @memberof useSelectedRecords
 * @alias UseSelectedRecordsResult
 */
export type UseSelectedRecordsResult = {
  /** Array of selected records */
  selectedRecords: Array<RecordJSON>;
  /** Sets selected records */
  setSelectedRecords: (records: Array<RecordJSON>) => void;
  /** handler function for single select action */
  handleSelect: (record: RecordJSON) => void;
  /** handler function for `select all records` action */
  handleSelectAll: () => void;
}
