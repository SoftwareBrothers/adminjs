import { Action, ActionResponse } from '../action.interface';
import { RecordJSON } from '../../../frontend/interfaces';
/**
 * @implements Action
 * @category Actions
 * @module ListAction
 * @description
 * Returns selected Records in a list form
 * @private
 */
export declare const ListAction: Action<ListActionResponse>;
export default ListAction;
/**
 * Response returned by List action
 * @memberof module:ListAction
 * @alias ListAction
 */
export declare type ListActionResponse = ActionResponse & {
    /**
     * Paginated collection of records
     */
    records: Array<RecordJSON>;
    /**
     * Pagination metadata
     */
    meta: {
        page: number;
        perPage: number;
        direction: 'asc' | 'desc';
        sortBy: string;
        total: number;
    };
};
