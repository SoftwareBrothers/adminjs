import * as path from 'path'
import * as fs from 'fs'
import { OverridableComponent } from '../frontend/utils/overridable-component'
import { relativeFilePathResolver } from './file-resolver'
import { ConfigurationError } from '../backend'

export interface ComponentDetails {
  overrides: boolean
  filePath: string
}

export default class ComponentLoader {
  protected components: Record<string, ComponentDetails>

  public constructor(protected readonly themeId?: string) {
    this.components = {}
  }

  public add(name: string, filePath: string) {
    if (this.components[name]
      || ComponentLoader.defaultComponents.includes(name as OverridableComponent)
    ) {
      throw new Error(`Component '${name}' is already defined, use .override() instead`)
    }
    this.components[name] = {
      overrides: false,
      filePath,
    }
    return name
  }

  public override(name: string, filePath: string) {
    if (!this.components[name]
      && !ComponentLoader.defaultComponents.includes(name as OverridableComponent)
    ) {
      throw new Error(`Component '${name}' is not defined, use .add() instead`)
    }
    this.components[name] = {
      overrides: true,
      filePath,
    }
    return name
  }

  public clear() {
    this.components = {}
    global.UserComponents = {}
  }

  public bundleAll() {
    if (this.themeId) {
      global.THEME = global.THEME ?? { Components: {} }
      global.THEME.Components = {}
    } else {
      global.UserComponents = {}
    }
    Object.entries(this.components).forEach(([id, { filePath }]) => {
      const extensions = ['.jsx', '.js', '.ts', '.tsx']
      const src = path.isAbsolute(filePath)
        ? filePath
        : relativeFilePathResolver(filePath, /.*.{1}bundleAll/)

      const { ext: originalFileExtension } = path.parse(src)
      for (const extension of extensions) {
        const forcedExt = extensions.includes(originalFileExtension) ? '' : extension
        const { root, dir, name, ext } = path.parse(src + forcedExt)
        const fileName = path.format({ root, dir, name, ext })
        if (fs.existsSync(fileName)) {
          if (this.themeId) {
            if (!global.THEME?.Components) {
              throw new Error('something is wrong here')
            }
            global.THEME.Components[id] = path.format({ root, dir, name })
          } else {
            if (!global.UserComponents) {
              throw new Error('something is wrong here')
            }
            global.UserComponents[id] = path.format({ root, dir, name })
          }
          return
        }
      }

      throw new ConfigurationError(`Trying to bundle file '${src}' but it doesn't exist`, 'AdminJS.html')
    })
  }

  protected static defaultComponents: OverridableComponent[] = [
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
  ]
}
