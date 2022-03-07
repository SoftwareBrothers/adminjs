import { Dispatch, SetStateAction } from 'react';
import { ActionJSON, RecordJSON, ResourceJSON } from '../../interfaces';
/**
 * Props which are passed to all action components
 * @alias ActionProps
 * @memberof BaseActionComponent
 */
export declare type ActionProps = {
    /**
     * Action object describing the action
     */
    action: ActionJSON;
    /**
     * Object of type: {@link ResourceJSON}
     */
    resource: ResourceJSON;
    /**
     * Selected record. Passed for actions with "record" actionType
     */
    record?: RecordJSON;
    /**
     * Selected records. Passed for actions with "bulk" actionType
     */
    records?: Array<RecordJSON>;
    /**
     * Sets tag in a header of an action. It is a function taking tag as an argument
     */
    setTag?: Dispatch<SetStateAction<string>>;
};
