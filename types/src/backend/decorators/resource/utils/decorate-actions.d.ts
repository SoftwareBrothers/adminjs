import { ResourceDecorator } from '..';
import AdminJS from '../../../../adminjs';
import { BaseResource } from '../../../adapters';
import { ActionDecorator } from '../../action';
export declare type DecoratedActions = {
    [key: string]: ActionDecorator;
};
/**
 * Used to create an {@link ActionDecorator} based on both
 * {@link AdminJS.ACTIONS default actions} and actions specified by the user
 * via {@link AdminJSOptions}
 *
 * @returns {Record<string, ActionDecorator>}
 * @private
 */
export declare function decorateActions(resource: BaseResource, admin: AdminJS, decorator: ResourceDecorator): DecoratedActions;
