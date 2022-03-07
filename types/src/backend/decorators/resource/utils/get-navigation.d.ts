import { ResourceJSON } from '../../../../frontend/interfaces';
import { ResourceOptions } from '..';
import { BaseResource } from '../../../adapters';
export declare type DatabaseData = {
    databaseName: BaseResource['databaseName'];
    databaseType: BaseResource['databaseType'];
};
export declare const DEFAULT_ICON = "Archive";
export declare const getIcon: (icon?: string | undefined) => string;
export declare const getNavigation: (options: ResourceOptions, database: DatabaseData) => ResourceJSON['navigation'];
