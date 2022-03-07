import { ActionResponse } from '../../../backend/actions/action.interface';
import { ActionJSON } from '../../interfaces';
import { DifferentActionParams, ActionCallCallback, UseActionResult } from './use-action.types';
/**
 * @load ./use-action.doc.md
 * @subcategory Hooks
 *
 * @param {ActionJSON}   action      action object
 * @param {ActionParams} params
 * @param {ActionCallCallback} onActionCall - callback triggered when action is performed
 * @return {UseActionResult}
 * @new In version 3.3
 * @class
 * @hideconstructor
 */
export declare function useAction<K extends ActionResponse>(action: ActionJSON, params: DifferentActionParams, onActionCall?: ActionCallCallback): UseActionResult<K>;
