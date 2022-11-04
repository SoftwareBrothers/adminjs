import { AxiosResponse } from 'axios';
import { ActionResponse } from '../../../backend';
import { DifferentActionParams } from '../../hooks';
import { ActionJSON } from './action-json.interface';
export declare function callActionApi<K extends ActionResponse>(action: ActionJSON, params: DifferentActionParams, search?: Location['search']): Promise<AxiosResponse<K>>;
