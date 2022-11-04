import RecordError from './record-error';
/**
 * Error which is thrown when given record/resource/action hasn't been found.
 *
 * @category Errors
 */
export declare class NotFoundError extends Error {
    /**
     * HTTP Status code: 404
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
     * @param   {string}  fnName  name of the function, base on which error will
     * print on the output link to the method documentation.
     * @param {string} message
     */
    constructor(message: any, fnName: any);
}
export default NotFoundError;
