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
   * Object of type: {@link ActionJSON}
   */
  record?: RecordJSON;

  /**
   * Sets tag in a header of an action.
   */
  setTag?: Dispatch<SetStateAction<string>>;
}
