/**
 * Generates entry file for all UsersComponents.
 * Entry consists of 3 parts:
 * 1. setup AdminBro.UserComponents map.
 * 2. List of all environmental variables passed to AdminBro in configuration option.
 * 3. Import of UserComponents defined by AdminBro.require(src)
 *
 * @param {AdminBro}
 * @return {String}     content of an entry file
 *
 * @private
 */
const generateUserComponentEntry = (admin) => {
  const { env = {} } = admin.options
  const { UserComponents } = admin.constructor

  const setupPart = 'AdminBro.UserComponents = {}\n'

  const envPart = Object.keys(env).map(envKey => (
    `AdminBro.env.${envKey} = ${JSON.stringify(env[envKey])}\n`
  )).join('')
  const componentsPart = Object.keys(UserComponents).map(componentId => (
    [
      `import ${componentId} from '${UserComponents[componentId]}'`,
      `AdminBro.UserComponents.${componentId} = ${componentId}`,
    ].join('\n')
  )).join('\n')
  return setupPart + envPart + componentsPart
}

module.exports = generateUserComponentEntry
