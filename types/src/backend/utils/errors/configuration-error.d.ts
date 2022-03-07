/**
 * Error which is thrown when user messed up something in the configuration
 *
 * @category Errors
 */
export declare class ConfigurationError extends Error {
    /**
     * @param   {string}  fnName  name of the function, base on which error will
     * print on the output link to the method documentation.
     * @param {string} message
     */
    constructor(message: any, fnName: any);
}
export default ConfigurationError;
