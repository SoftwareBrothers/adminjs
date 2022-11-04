import React from 'react';
import { ResourceJSON } from '../../../interfaces';
export declare type NoRecordsProps = {
    resource: ResourceJSON;
};
declare const NoRecords: React.ComponentType<NoRecordsProps & {
    OriginalComponent?: React.ComponentType<NoRecordsProps> | undefined;
}>;
export { NoRecords };
export default NoRecords;
