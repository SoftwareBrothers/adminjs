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
     * Any custom message which should be seen in the UI
     */
    baseMessage?: string;
    /**
     * @param {string} [message]
     */
    constructor(message?: string);
}
export default ForbiddenError;
