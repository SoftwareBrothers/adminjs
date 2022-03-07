/**
 * Type representing the AdminJS.Router
 * @memberof Router
 * @alias RouterType
 */
export declare type RouterType = {
    assets: Array<{
        path: string;
        src: string;
    }>;
    routes: Array<{
        method: string;
        path: string;
        Controller: any;
        action: string;
        contentType?: string;
    }>;
};
/**
 * @load ./router.doc.md
 * @namespace
 */
export declare const Router: RouterType;
export default Router;
