import { RecordJSON } from '../../interfaces';
import { UseRecordOptions, UseRecordResult } from './use-record.type';
/**
 * @load ./use-record.doc.md
 * @subcategory Hooks
 * @class
 * @hideconstructor
 * @bundle
 * @param {RecordJSON} [initialRecord],
 * @param {string} resourceId
 * @param {UseRecordOptions} [options]
 * @return {UseRecordResult}
 */
export declare const useRecord: (initialRecord: RecordJSON | undefined, resourceId: string, options?: UseRecordOptions | undefined) => UseRecordResult;
export default useRecord;
