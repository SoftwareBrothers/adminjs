import RecordError from './record-error';
/**
 * Error which is thrown when user
 * doesn't have an access to a given resource/action.
 *
 * @category Errors
 */
export declare class ForbiddenError extends Error {
    /**
     * HTTP Status code: 403
     */
    statusCode: number;
    /**
     * Base error message and type which is stored in the record
     */
    baseError: RecordError;
    /**
     * Any custom message which should be seen in the UI
     */
    baseMessage?: string;
    /**
     * @param {string} [message]
     */
    constructor(message?: string);
}
export default ForbiddenError;
