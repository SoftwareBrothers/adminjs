import { RecordActionParams } from '../../../backend/utils/view-helpers/view-helpers';
import { ActionJSON } from '..';
import { DifferentActionParams } from '../../hooks/use-action/use-action.types';
export declare const isRecordAction: (params: DifferentActionParams, action: ActionJSON) => params is RecordActionParams;
