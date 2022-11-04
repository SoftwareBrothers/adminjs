import { RecordJSON } from '../../interfaces';
import { UseRecordOptions } from './use-record.type';
export declare const filterRecordParams: <T extends RecordJSON>(record: T, options?: UseRecordOptions) => T;
export declare const isPropertyPermitted: (propertyName: any, options?: UseRecordOptions) => boolean;
