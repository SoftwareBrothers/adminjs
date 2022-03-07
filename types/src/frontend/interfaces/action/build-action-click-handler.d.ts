import { DifferentActionParams, useActionResponseHandler } from '../../hooks';
import { ActionJSON } from './action-json.interface';
export declare type BuildActionClickOptions = {
    action: ActionJSON;
    params: DifferentActionParams;
    actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
    push: (path: string, state?: any) => void;
};
export declare type BuildActionClickReturn = (event: any) => any;
export declare const buildActionClickHandler: (options: BuildActionClickOptions) => BuildActionClickReturn;
