import { ResourceJSON } from '../../../../frontend/interfaces'
import { ResourceOptions } from '..'
import { BaseResource, SupportedDatabasesType } from '../../../adapters'

export type DatabaseData = {
  databaseName: BaseResource['databaseName'];
  databaseType: BaseResource['databaseType'];
}

export const DEFAULT_ICON = 'Archive'

type IconMapType = {[key in SupportedDatabasesType]: string}

export const getIcon = (icon?: SupportedDatabasesType | string): string => {
  const IconMap: IconMapType = {
    MariaDB: 'Sql',
    MySQL: 'Sql',
    Postgres: 'Sql',
    CockroachDB: 'Sql',
    SQLite: 'Sql',
    MicrosoftSQLServer: 'Sql',
    Oracle: 'Sql',
    SAPHana: 'CloudApp',
    MongoDB: 'Archive',
    other: 'Archive',
  }
  return (icon && IconMap[icon]) ? IconMap[icon] : DEFAULT_ICON
}

export const getNavigation = (
  options: ResourceOptions,
  database: DatabaseData,
): ResourceJSON['navigation'] => {
  const navigationOption = typeof options.navigation !== 'undefined'
    ? options.navigation
    : options.parent

  if (navigationOption === null) {
    return null
  }

  if (navigationOption === undefined || typeof navigationOption === 'string') {
    return {
      name: navigationOption || database.databaseName(),
      icon: getIcon(database.databaseType()),
    }
  }
  const { name, icon } = navigationOption
  return {
    name: name || null,
    icon: icon || getIcon(database.databaseType()),
  }
}
