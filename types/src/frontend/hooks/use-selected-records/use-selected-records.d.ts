import { RecordJSON } from '../../interfaces';
import { UseSelectedRecordsResult } from './use-selected-records-result.type';
/**
 * @load ./use-selected-records.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @param {Array<RecordJSON>} records     List of records on which you can perform `select` action
 * @return {UseSelectedRecordsResult}
 * @bundle
 * @type {Function}
 */
declare function useSelectedRecords(records: Array<RecordJSON>): UseSelectedRecordsResult;
export { useSelectedRecords as default, useSelectedRecords, };
