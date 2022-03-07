import { i18n as I18n } from 'i18next';
import { AdminJSOptionsWithDefault, AdminJSOptions } from './adminjs-options.interface';
import BaseResource from './backend/adapters/resource/base-resource';
import BaseDatabase from './backend/adapters/database/base-database';
import { RecordActionResponse, Action, BulkActionResponse } from './backend/actions/action.interface';
import { ListActionResponse } from './backend/actions/list/list-action';
import { Locale } from './locale/config';
import { TranslateFunctions } from './utils/translate-functions.factory';
import { OverridableComponent } from './frontend/utils/overridable-component';
export declare const VERSION: any;
export declare const defaultOptions: AdminJSOptionsWithDefault;
declare type ActionsMap = {
    show: Action<RecordActionResponse>;
    edit: Action<RecordActionResponse>;
    delete: Action<RecordActionResponse>;
    bulkDelete: Action<BulkActionResponse>;
    new: Action<RecordActionResponse>;
    list: Action<ListActionResponse>;
};
export declare type Adapter = {
    Database: typeof BaseDatabase;
    Resource: typeof BaseResource;
};
/**
 * Main class for AdminJS extension. It takes {@link AdminJSOptions} as a
 * parameter and creates an admin instance.
 *
 * Its main responsibility is to fetch all the resources and/or databases given by a
 * user. Its instance is a currier - injected in all other classes.
 *
 * @example
 * const AdminJS = require('adminjs')
 * const admin = new AdminJS(AdminJSOptions)
 */
declare class AdminJS {
    resources: Array<BaseResource>;
    options: AdminJSOptionsWithDefault;
    locale: Locale;
    i18n: I18n;
    translateFunctions: TranslateFunctions;
    /**
     * List of all default actions. If you want to change the behavior for all actions like:
     * _list_, _edit_, _show_, _delete_ and _bulkDelete_ you can do this here.
     *
     * @example <caption>Modifying accessibility rules for all show actions</caption>
     * const { ACTIONS } = require('adminjs')
     * ACTIONS.show.isAccessible = () => {...}
     */
    static ACTIONS: ActionsMap;
    /**
     * AdminJS version
     */
    static VERSION: string;
    /**
     * @param   {AdminJSOptions} options      Options passed to AdminJS
     */
    constructor(options?: AdminJSOptions);
    initI18n(): void;
    /**
     * Registers various database adapters written for AdminJS.
     *
     * @example
     * const AdminJS = require('adminjs')
     * const MongooseAdapter = require('adminjs-mongoose')
     * AdminJS.registerAdapter(MongooseAdapter)
     *
     * @param  {Object}       options
     * @param  {typeof BaseDatabase} options.Database subclass of {@link BaseDatabase}
     * @param  {typeof BaseResource} options.Resource subclass of {@link BaseResource}
     */
    static registerAdapter({ Database, Resource }: {
        Database: typeof BaseDatabase;
        Resource: typeof BaseResource;
    }): void;
    /**
     * Initializes AdminJS instance in production. This function should be called by
     * all external plugins.
     */
    initialize(): Promise<void>;
    /**
     * Watches for local changes in files imported via {@link AdminJS.bundle}.
     * It doesn't work on production environment.
     *
     * @return  {Promise<never>}
     */
    watch(): Promise<string | undefined>;
    /**
     * Renders an entire login page with email and password fields
     * using {@link Renderer}.
     *
     * Used by external plugins
     *
     * @param  {Object} options
     * @param  {String} options.action          Login form action url - it could be
     *                                          '/admin/login'
     * @param  {String} [options.errorMessage]  Optional error message. When set,
     *                                          renderer will print this message in
     *                                          the form
     * @return {Promise<string>}                HTML of the rendered page
     */
    renderLogin({ action, errorMessage }: {
        action: any;
        errorMessage: any;
    }): Promise<string>;
    /**
     * Returns resource base on its ID
     *
     * @example
     * const User = admin.findResource('users')
     * await User.findOne(userId)
     *
     * @param  {String} resourceId    ID of a resource defined under {@link BaseResource#id}
     * @return {BaseResource}         found resource
     * @throws {Error}                When resource with given id cannot be found
     */
    findResource(resourceId: any): BaseResource;
    /**
     * Resolve babel config file path,
     * and load configuration to this.options.bundler.babelConfig.
     */
    resolveBabelConfigPath(): void;
    /**
     * Requires given `.jsx/.tsx` file, that it can be bundled to the frontend.
     * It will be available under AdminJS.UserComponents[componentId].
     *
     * @param   {String}  src  Path to a file containing react component.
     *
     * @param  {OverridableComponent}  [componentName] - name of the component which you want
     *                                  to override
     * @returns {String}                componentId - uniq id of a component
     *
     * @example <caption>Passing custom components in AdminJS options</caption>
     * const adminJsOptions = {
     *   dashboard: {
     *     component: AdminJS.bundle('./path/to/component'),
     *   }
     * }
     * @example <caption>Overriding AdminJS core components</caption>
     * // somewhere in the code
     * AdminJS.bundle('./path/to/new-sidebar/component', 'SidebarFooter')
     */
    static bundle(src: string, componentName?: OverridableComponent): string;
}
interface AdminJS extends TranslateFunctions {
}
export declare const registerAdapter: typeof AdminJS.registerAdapter;
export declare const bundle: typeof AdminJS.bundle;
export default AdminJS;
