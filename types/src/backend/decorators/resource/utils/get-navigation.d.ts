import { ResourceJSON } from '../../../../frontend/interfaces';
import { ResourceOptions } from '..';
import { BaseResource, SupportedDatabasesType } from '../../../adapters';
export declare type DatabaseData = {
    databaseName: BaseResource['databaseName'];
    databaseType: BaseResource['databaseType'];
};
export declare const DEFAULT_ICON = "Archive";
export declare const getIcon: (icon?: SupportedDatabasesType | string) => string;
export declare const getNavigation: (options: ResourceOptions, database: DatabaseData) => ResourceJSON['navigation'];
