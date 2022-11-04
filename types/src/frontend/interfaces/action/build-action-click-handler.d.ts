import { NavigateFunction } from 'react-router';
import { DifferentActionParams, useActionResponseHandler } from '../../hooks';
import { ActionJSON } from './action-json.interface';
export declare type BuildActionClickOptions = {
    action: ActionJSON;
    params: DifferentActionParams;
    actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
    navigate: NavigateFunction;
};
export declare type BuildActionClickReturn = (event: any) => any | Promise<any>;
export declare const buildActionClickHandler: (options: BuildActionClickOptions) => BuildActionClickReturn;
