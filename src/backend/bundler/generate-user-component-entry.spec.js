import path from 'path'
import AdminBro from '../../admin-bro'
import generateUserComponentEntry from './generate-user-component-entry'

const exampleComponent = '../../../spec/fixtures/example-component'
const entryPath = './'

describe('generateUserComponentEntry', function () {
  it('defines AdminBro.UserComponents', function () {
    const adminBro = new AdminBro()

    const entryFile = generateUserComponentEntry(adminBro, entryPath)

    expect(entryFile).to.have.string('AdminBro.UserComponents = {}\n')
  })

  it('adds env variables to the entry file', function () {
    const adminBro = new AdminBro({
      env: { ENV_NAME: 'value' },
    })

    const entryFile = generateUserComponentEntry(adminBro, entryPath)

    expect(entryFile).to.have.string('AdminBro.env.ENV_NAME = "value"\n')
  })

  it('adds components to the entry file', function () {
    const adminBro = new AdminBro()
    const componentId = AdminBro.bundle(exampleComponent)
    const rootEntryPath = path.resolve(entryPath)
    const filePath = path.relative(
      rootEntryPath,
      path.normalize(path.join(__dirname, exampleComponent)),
    )

    const entryFile = generateUserComponentEntry(adminBro, entryPath)

    expect(entryFile).to.have.string([
      `import ${componentId} from '${filePath}'`,
      `AdminBro.UserComponents.${componentId} = ${componentId}`,
    ].join('\n'))

    AdminBro.UserComponents = {}
  })
})
