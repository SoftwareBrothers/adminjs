import { UseRecordsResult } from './use-records-result.type';
/**
 * @load ./use-records.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 *
 * @param {string} resourceId      id of a resource for which you want to fetch records
 * @return {UseRecordsResult}
 * @new In version 3.3
 * @bundle
 * @type {Function}
 */
declare function useRecords(resourceId: string): UseRecordsResult;
export { useRecords as default, useRecords, };
