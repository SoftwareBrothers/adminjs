import { ActionResponse } from '../../../backend/actions/action.interface';
import { ActionCallCallback } from '.';
export declare const useActionResponseHandler: (onActionCall?: ActionCallCallback) => (response: ActionResponse) => void;
