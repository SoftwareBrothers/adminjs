import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import RecordJSON from '../../../backend/decorators/record-json.interface'

export type ActionProps = {
  /**
   * Object of type: {@link ResourceJSON}
   */
  resource: ResourceJSON;
  /**
   * Object of type: {@link ActionJSON}
   */
  record: RecordJSON;
}
