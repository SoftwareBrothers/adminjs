import * as path from 'path'
import * as fs from 'fs'

import { ConfigurationError } from './errors/index.js'
import { relativeFilePathResolver } from '../../utils/file-resolver.js'

export interface ComponentDetails {
  overrides: boolean
  filePath: string
}

export class ComponentLoader {
  protected components: Record<string, ComponentDetails> = {}

  public add(name: string, filePath: string, caller = 'add') {
    const resolvedFilePath = ComponentLoader.resolveFilePath(filePath, caller)
    if ((this.components[name] && this.components[name].filePath !== resolvedFilePath)
      || ComponentLoader.defaultComponents.includes(name)
    ) {
      throw new Error(`Component '${name}' is already defined, use .override() instead`)
    }
    this.components[name] = {
      overrides: false,
      filePath: resolvedFilePath,
    }
    return name
  }

  public override(name: string, filePath: string, caller = 'override') {
    const resolvedFilePath = ComponentLoader.resolveFilePath(filePath, caller)
    if (!this.components[name]
      && !ComponentLoader.defaultComponents.includes(name)
    ) {
      throw new Error(`Component '${name}' is not defined, use .add() instead`)
    }
    this.components[name] = {
      overrides: true,
      filePath: resolvedFilePath,
    }
    return name
  }

  public __unsafe_addWithoutChecks(name: string, filePath: string, caller = '__unsafe_addWithoutChecks') {
    const resolvedFilePath = ComponentLoader.resolveFilePath(filePath, caller)
    this.components[name] = {
      overrides: false,
      filePath: resolvedFilePath,
    }
    return name
  }

  public clear() {
    this.components = {}
  }

  public getComponents() {
    return Object
      .entries(this.components)
      .reduce(
        (result, [key, component]) => {
          result[key] = component.filePath
          return result
        },
        {} as Record<string, string>,
      )
  }

  public __unsafe_merge(componentLoader: ComponentLoader): void {
    this.components = {
      ...componentLoader.components,
      ...this.components,
    }
  }

  public static resolveFilePath(filePath: string, caller: string): string {
    const extensions = ['.jsx', '.js', '.ts', '.tsx', '.mts', '.mjs']
    const src = path.isAbsolute(filePath)
      ? filePath
      : relativeFilePathResolver(filePath, new RegExp(`.*.{1}${caller}`))

    const { ext: originalFileExtension } = path.parse(src)
    for (const extension of extensions) {
      const forcedExt = extensions.includes(originalFileExtension) ? '' : extension
      const { root, dir, name, ext } = path.parse(src + forcedExt)
      const fileName = path.format({ root, dir, name, ext })
      if (fs.existsSync(fileName)) {
        return path.format({ root, dir, name })
      }
    }

    throw new ConfigurationError(`Trying to bundle file '${src}' but it doesn't exist`, 'AdminJS.html')
  }

  protected static defaultComponents = [
    'LoggedIn',
    'NoRecords',
    'SidebarResourceSection',
    'SidebarFooter',
    'SidebarBranding',
    'Sidebar',
    'TopBar',
    'Breadcrumbs',
    'FilterDrawer',
    'NoticeBox',
    'Version',
    'SidebarPages',
    'PropertyHeader',
    'RecordInList',
    'RecordsTableHeader',
    'RecordsTable',
    'SelectedRecords',
    'StyledBackButton',
    'ActionHeader',
    'ActionButton',
    'BulkActionRoute',
    'DashboardRoute',
    'RecordActionRoute',
    'ResourceActionRoute',
    'ResourceRoute',
    'PageRoute',
    'RouteWrapper',
    'Application',
    'DefaultEditAction',
    'DefaultBulkDeleteAction',
    'DefaultListAction',
    'DefaultNewAction',
    'DefaultShowAction',
    'DefaultArrayShowProperty',
    'DefaultArrayListProperty',
    'DefaultArrayEditProperty',
    'DefaultBooleanEditProperty',
    'DefaultBooleanFilterProperty',
    'DefaultBooleanListProperty',
    'DefaultBooleanShowProperty',
    'BooleanPropertyValue',
    'DefaultCurrencyEditProperty',
    'DefaultCurrencyShowProperty',
    'DefaultCurrencyListProperty',
    'DefaultCurrencyFilterProperty',
    'CurrencyPropertyInputWrapper',
    'DefaultDatetimeEditProperty',
    'DefaultDatetimeShowProperty',
    'DefaultDatetimeListProperty',
    'DefaultDatetimeFilterProperty',
    'DefaultPropertyValue',
    'DefaultShowProperty',
    'DefaultListProperty',
    'DefaultEditProperty',
    'DefaultFilterProperty',
    'DefaultMixedShowProperty',
    'DefaultMixedListProperty',
    'DefaultMixedEditProperty',
    'DefaultPasswordEditProperty',
    'DefaultPhoneEditProperty',
    'DefaultPhoneFilterProperty',
    'DefaultPhoneListProperty',
    'DefaultPhoneShowProperty',
    'DefaultReferenceEditProperty',
    'DefaultReferenceShowProperty',
    'DefaultReferenceListProperty',
    'DefaultReferenceFilterProperty',
    'DefaultReferenceValue',
    'DefaultRichtextEditProperty',
    'DefaultRichtextListProperty',
    'DefaultRichtextShowProperty',
    'DefaultTextareaEditProperty',
    'DefaultTextareaShowProperty',
    'PropertyDescription',
    'PropertyLabel',
    'Login',
    'AuthenticationBackgroundComponent',
    'Footer',
  ]
}
