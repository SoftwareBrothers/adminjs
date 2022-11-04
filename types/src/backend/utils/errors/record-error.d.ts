import { ErrorTypeEnum } from '../../../utils/error-type.enum';
/**
 * Record Error
 * @alias RecordError
 * @memberof ValidationError
 */
export declare type RecordError = {
    /**
     * error type (i.e. required)
     */
    type?: ErrorTypeEnum | string;
    /**
     * human readable message
     */
    message: string;
};
export default RecordError;
