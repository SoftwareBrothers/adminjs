import * as path from 'path'
import slash from 'slash'

import AdminJS from '../../adminjs.js'

/**
 * Generates entry file for all UsersComponents.
 * Entry consists of 3 parts:
 * 1. Setup AdminJS.UserComponents map.
 * 2. List of all environmental variables passed to AdminJS in configuration option.
 * 3. Imports of user components defined by ComponentLoader.
 *
 * @param {AdminJS}    admin
 * @param {String}      entryPath  path to folder where entry file is located
 * @return {String}     content of an entry file
 *
 * @private
 */
const generateUserComponentEntry = (admin: AdminJS, entryPath: string): string => {
  const { env = {} } = admin.options
  admin.componentLoader.__unsafe_merge(AdminJS.__unsafe_staticComponentLoader)
  const components = admin.componentLoader.getComponents()

  const absoluteEntryPath = path.resolve(entryPath)

  const setupPart = 'AdminJS.UserComponents = {}\n'

  const envPart = Object.keys(env).map((envKey) => (
    `AdminJS.env.${envKey} = ${JSON.stringify(env[envKey])}\n`
  )).join('')
  const componentsPart = Object.keys(components || {}).map((componentId) => {
    const componentUrl = path.relative(
      absoluteEntryPath,
      components[componentId],
    )
    return [
      `import ${componentId} from '${slash(componentUrl)}'`,
      `AdminJS.UserComponents.${componentId} = ${componentId}`,
    ].join('\n')
  }).join('\n')
  return setupPart + envPart + componentsPart
}

export default generateUserComponentEntry
