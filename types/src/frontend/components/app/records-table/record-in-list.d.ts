import React from 'react';
import { RecordJSON, ResourceJSON } from '../../../interfaces';
import { ActionResponse } from '../../../../backend/actions/action.interface';
export declare type RecordInListProps = {
    resource: ResourceJSON;
    record: RecordJSON;
    actionPerformed?: (action: ActionResponse) => any;
    isLoading?: boolean;
    onSelect?: (record: RecordJSON) => void;
    isSelected?: boolean;
};
export declare const RecordInList: React.FC<RecordInListProps>;
export default RecordInList;
