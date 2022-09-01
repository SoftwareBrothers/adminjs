import { ErrorTypeEnum } from '../../../utils/error-type.enum'

export type RecordError = {
  /**
   * error type (i.e. required)
   */
  type?: ErrorTypeEnum | string;
  /**
   * human readable message
   */
  message: string;
}

// eslint-disable-next-line no-undef
export default RecordError
