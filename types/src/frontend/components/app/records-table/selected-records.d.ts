import React from 'react';
import { RecordJSON, ResourceJSON } from '../../../interfaces';
declare type SelectedRecordsProps = {
    resource: ResourceJSON;
    selectedRecords?: Array<RecordJSON>;
};
export declare const SelectedRecords: React.FC<SelectedRecordsProps>;
export default SelectedRecords;
