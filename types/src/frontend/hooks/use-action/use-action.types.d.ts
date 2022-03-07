import React from 'react';
import { AxiosResponse } from 'axios';
import { BulkActionParams, ResourceActionParams, RecordActionParams, ActionParams } from '../../../backend/utils/view-helpers/view-helpers';
import { ActionResponse } from '../../../backend/actions/action.interface';
export declare type DifferentActionParams = {
    resourceId: ActionParams['resourceId'];
    recordId?: RecordActionParams['recordId'];
    recordIds?: BulkActionParams['recordIds'];
};
export declare type MergedActionParams = RecordActionParams & BulkActionParams & ResourceActionParams;
export declare type ActionCallCallback = (action: ActionResponse) => any;
export declare type UseActionResultCallApi<K extends ActionResponse> = () => Promise<AxiosResponse<K>>;
/**
 * Result of the {@link useAction}.

 * @memberof useAction
 * @alias UseActionResult
 */
export declare type UseActionResult<K extends ActionResponse> = {
    /**
     * Href to an action. When null it means that action doesn't have neither component nor action
     * handler
     */
    href: string | null;
    /** function which will call the API */
    callApi: UseActionResultCallApi<K>;
    /** ready handleClick handler */
    handleClick: (event: React.MouseEvent<HTMLElement>) => void;
};
