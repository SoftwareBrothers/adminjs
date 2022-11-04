import { AxiosResponse } from 'axios';
import { ActionResponse } from '../../../backend';
import { DifferentActionParams, useActionResponseHandler } from '../../hooks';
import { ActionJSON } from './action-json.interface';
export declare type CallApiFunction<K extends ActionResponse> = () => Promise<AxiosResponse<K>>;
export declare type BuildActionCallApiTriggerOptions = {
    action: ActionJSON;
    params: DifferentActionParams;
    actionResponseHandler: ReturnType<typeof useActionResponseHandler>;
    search?: Location['search'];
};
export declare const buildActionCallApiTrigger: <K>(options: BuildActionCallApiTriggerOptions) => CallApiFunction<K>;
