import React from 'react';
import { RecordJSON, ResourceJSON } from '../../../interfaces';
import { ActionResponse } from '../../../../backend/actions/action.interface';
/**
 * @alias RecordsTableProps
 * @memberof RecordsTable
 */
export declare type RecordsTableProps = {
    /**
     * Resource which type records are rendered. Base on that we define which columns should be seen.
     */
    resource: ResourceJSON;
    /**
     * Array of records seen in the table
     */
    records: Array<RecordJSON>;
    /**
     * Handler function invoked when someone performs action without component on a given record.
     * Action without component is a `delete` action - you might want to refresh the list after that
     */
    actionPerformed?: (response: ActionResponse) => any;
    /** default sort by column */
    sortBy?: string;
    /** sort direction */
    direction?: 'asc' | 'desc';
    /** indicates if the table should be in loading state */
    isLoading?: boolean;
    /** list of selected records */
    selectedRecords?: Array<RecordJSON>;
    /** handler function triggered when record is selected */
    onSelect?: (record: RecordJSON) => any;
    /** handler function triggered when all items are selected */
    onSelectAll?: () => any;
};
/**
 * @classdesc
 * Renders an entire records table. To fill the data you might need:
 *
 * - {@link useRecords} and
 * - {@link useSelectedRecords} hooks
 *
 * so make sure to see at the documentation pages for both of them
 *
 * @component
 * @class
 * @hideconstructor
 * @subcategory Application
 * @new in version 3.3
 */
export declare const RecordsTable: React.FC<RecordsTableProps>;
export default RecordsTable;
