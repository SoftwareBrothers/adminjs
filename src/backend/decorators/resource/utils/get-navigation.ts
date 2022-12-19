import { ResourceJSON } from '../../../../frontend/interfaces'
import { ResourceOptions } from '..'
import { BaseResource, SupportedDatabasesType } from '../../../adapters'

export type DatabaseData = {
  databaseName: BaseResource['databaseName'];
  databaseType: BaseResource['databaseType'];
}

export const DEFAULT_ICON = 'Database'

type IconMapType = {[key in SupportedDatabasesType]: string}

export const getIcon = (icon?: SupportedDatabasesType | string): string => {
  const IconMap: IconMapType = {
    MariaDB: 'Database',
    MySQL: 'Database',
    Postgres: 'Database',
    CockroachDB: 'Database',
    SQLite: 'Database',
    MicrosoftSQLServer: 'Database',
    Oracle: 'Database',
    SAPHana: 'Cloud',
    MongoDB: 'FileText',
    other: 'Database',
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

  if (navigationOption === null || navigationOption === true) {
    return null
  }

  if (navigationOption === false) {
    return {
      name: null,
      icon: '',
      show: false,
    }
  }

  if (navigationOption === undefined || typeof navigationOption === 'string') {
    return {
      name: navigationOption || database.databaseName(),
      icon: getIcon(database.databaseType()),
      show: true,
    }
  }
  const { name, icon } = navigationOption
  return {
    name: name || null,
    icon: icon || getIcon(database.databaseType()),
    show: true,
  }
}
