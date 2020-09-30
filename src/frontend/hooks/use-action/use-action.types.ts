import React from 'react'
import { AxiosResponse } from 'axios'
import {
  BulkActionParams,
  ResourceActionParams,
  RecordActionParams,
} from '../../../backend/utils/view-helpers/view-helpers'
import { ActionResponse } from '../../../backend/actions/action.interface'

export type DifferentActionParams = Omit<RecordActionParams, 'actionName'> |
  Omit<BulkActionParams, 'actionName'> |
  Omit<ResourceActionParams, 'actionName'>;
export type MergedActionParams = RecordActionParams & BulkActionParams & ResourceActionParams;

export type ActionCallCallback = (action: ActionResponse) => any;
export type UseActionResultCallApi<K extends ActionResponse> = () => Promise<AxiosResponse<K>>;


/**
 * Result of the {@link useAction}.

 * @memberof useAction
 * @alias UseActionResult
 */
export type UseActionResult<K extends ActionResponse> = {
  /** Href to an action */
  href: string;
  /** function which will call the API */
  callApi: UseActionResultCallApi<K>;
  /** ready handleClick handler */
  handleClick: (event: React.MouseEvent<HTMLElement>) => void;
};
