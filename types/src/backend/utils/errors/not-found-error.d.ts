/**
 * Error which is thrown when given record/resource/action hasn't been found.
 *
 * @category Errors
 */
export declare class NotFoundError extends Error {
    /**
     * @param   {string}  fnName  name of the function, base on which error will
     * print on the output link to the method documentation.
     * @param {string} message
     */
    constructor(message: any, fnName: any);
}
export default NotFoundError;
