import { Dispatch, SetStateAction } from 'react'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'
import ActionJSON from '../../../backend/decorators/action-json.interface'

/**
 * Props which are passed to all action components
 * @alias ActionProps
 * @memberof BaseActionComponent
 */
export type ActionProps = {
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
}
