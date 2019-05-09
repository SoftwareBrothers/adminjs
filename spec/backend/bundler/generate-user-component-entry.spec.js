const path = require('path')
const AdminBro = require('../../../src/admin-bro')
const generateUserComponentEntry = require('../../../src/backend/bundler/generate-user-component-entry')

describe('generateUserComponentEntry', function () {
  it('defines AdminBro.UserComponents', function () {
    const adminBro = new AdminBro()

    const entryFile = generateUserComponentEntry(adminBro)

    expect(entryFile).to.have.string('AdminBro.UserComponents = {}\n')
  })

  it('adds env variables to the entry file', function () {
    const adminBro = new AdminBro({
      env: { ENV_NAME: 'value' },
    })

    const entryFile = generateUserComponentEntry(adminBro)

    expect(entryFile).to.have.string('AdminBro.env.ENV_NAME = "value"\n')
  })

  it('adds components to the entry file', function () {
    const adminBro = new AdminBro()
    const componentId = AdminBro.require('../../fixtures/example-component')
    const filePath = path.normalize(path.join(__dirname, '../../fixtures/example-component'))

    const entryFile = generateUserComponentEntry(adminBro)

    expect(entryFile).to.have.string([
      `import ${componentId} from '${filePath}'`,
      `AdminBro.UserComponents.${componentId} = ${componentId}`,
    ].join('\n'))

    AdminBro.UserComponents = {}
  })
})
