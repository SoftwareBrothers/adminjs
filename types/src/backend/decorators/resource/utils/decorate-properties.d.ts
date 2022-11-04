import { ResourceDecorator } from '..';
import AdminJS from '../../../../adminjs';
import { BaseResource } from '../../../adapters';
import { PropertyDecorator } from '../../property';
export declare type DecoratedProperties = {
    [key: string]: PropertyDecorator;
};
/**
 * Initializes PropertyDecorator for all properties within a resource. When
 * user passes new property in the options - it will be created as well.
 *
 * @returns {Object<string,PropertyDecorator>}
 * @private
 */
export declare function decorateProperties(resource: BaseResource, admin: AdminJS, decorator: ResourceDecorator): DecoratedProperties;
