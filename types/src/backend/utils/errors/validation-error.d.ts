/**
 * Record Error
 * @alias RecordError
 * @memberof ValidationError
 */
export declare type RecordError = {
    /**
     * error type (i.e. required)
     */
    type?: string;
    /**
     * human readable message
     */
    message: string;
};
/**
 * Property Errors
 * @alias PropertyErrors
 * @memberof ValidationError
 */
export declare type PropertyErrors = {
    [key: string]: RecordError;
};
/**
 * Error which is thrown when there are validation errors with records
 * @category Errors
 */
export declare class ValidationError extends Error {
    /**
     * Validation errors for all properties
     */
    propertyErrors: PropertyErrors;
    /**
     * One root validation error i.e. thrown when user wants to perform
     * an action which violates foreign key constraint
     */
    baseError: RecordError | null;
    /**
     * HTTP Status code: 400
     */
    statusCode: number;
    /**
     * @param {PropertyErrors} propertyErrors     error messages
     * @param {RecordError} [baseError]           base error message
     */
    constructor(propertyErrors: PropertyErrors, baseError?: RecordError);
}
export default ValidationError;
