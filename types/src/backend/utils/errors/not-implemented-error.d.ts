/**
 * Error which is thrown when an abstract method is not implemented
 *
 * @category Errors
 */
export declare class NotImplementedError extends Error {
    /**
     * @param   {string}  fnName  name of the function, base on which error will
     * print on the output link to the method documentation.
     */
    constructor(fnName: string);
}
export default NotImplementedError;
