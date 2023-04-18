import { ActionJSON, RecordJSON, ResourceJSON } from '../../../interfaces/index.js'
import { ActionResponse } from '../../../../backend/actions/action.interface.js'

/**
 * @memberof ActionHeader
 * @alias ActionHeaderProps
 */
export type ActionHeaderProps = {
  /** Resource for the action */
  resource: ResourceJSON;
  /** Optional record - for _record_ actions */
  record?: RecordJSON;
  /** If given, action header will render Filter button */
  toggleFilter?: (() => any) | boolean;
  /**
   * It indicates if action without a component was performed.
   */
  actionPerformed?: (action: ActionResponse) => any;
  /** An action objet */
  action: ActionJSON;
  /** Optional tag which will be rendered as a {@link Badge} */
  tag?: string;
  /** If set, component wont render actions */
  omitActions?: boolean;
};
