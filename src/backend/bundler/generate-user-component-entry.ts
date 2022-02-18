import * as path from 'path'
import slash from 'slash'

/**
 * Generates entry file for all UsersComponents.
 * Entry consists of 3 parts:
 * 1. setup AdminJS.UserComponents map.
 * 2. List of all environmental variables passed to AdminJS in configuration option.
 * 3. Import of UserComponents defined by AdminJS.bundle(src)
 *
 * @param {AdminJS}    admin
 * @param {String}      entryPath  path to folder where entry file is located
 * @return {String}     content of an entry file
 *
 * @private
 */
const generateUserComponentEntry = (admin, entryPath: string): string => {
  const { env = {} } = admin.options
  const { UserComponents } = global as any

  const absoluteEntryPath = path.resolve(entryPath)

  const setupPart = 'AdminJS.UserComponents = {}\n'

  const envPart = Object.keys(env).map(envKey => (
    `AdminJS.env.${envKey} = ${JSON.stringify(env[envKey])}\n`
  )).join('')
  const componentsPart = Object.keys(UserComponents || {}).map((componentId) => {
    const componentUrl = path.relative(
      absoluteEntryPath,
      (UserComponents as UserComponentsMap)[componentId],
    )
    return [
      `import ${componentId} from '${slash(componentUrl)}'`,
      `AdminJS.UserComponents.${componentId} = ${componentId}`,
    ].join('\n')
  }).join('\n')
  return setupPart + envPart + componentsPart
}

export default generateUserComponentEntry
