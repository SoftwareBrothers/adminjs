import { ActionJSON } from '..';
import { DifferentActionParams } from '../../hooks/use-action/use-action.types';
export declare const isResourceAction: (params: DifferentActionParams, action: ActionJSON) => params is import("../../../backend/utils/view-helpers/view-helpers").ActionParams;
