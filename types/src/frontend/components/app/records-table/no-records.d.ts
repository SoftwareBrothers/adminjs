import React from 'react';
import { ResourceJSON } from '../../../interfaces';
export declare type NoRecordsProps = {
    resource: ResourceJSON;
};
declare const NoRecords: React.ComponentType<NoRecordsProps & {
    OriginalComponent?: React.FunctionComponent<NoRecordsProps> | React.ComponentClass<NoRecordsProps, any> | undefined;
}>;
export { NoRecords };
export default NoRecords;
