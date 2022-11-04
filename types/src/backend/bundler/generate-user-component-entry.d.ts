/**
 * Generates entry file for all UsersComponents.
 * Entry consists of 3 parts:
 * 1. setup AdminJS.UserComponents map.
 * 2. List of all environmental variables passed to AdminJS in configuration option.
 * 3. Import of UserComponents defined by AdminJS.bundle(src)
 *
 * @param {AdminJS}    admin
 * @param {String}      entryPath  path to folder where entry file is located
 * @return {String}     content of an entry file
 *
 * @private
 */
declare const generateUserComponentEntry: (admin: any, entryPath: string) => string;
export default generateUserComponentEntry;
