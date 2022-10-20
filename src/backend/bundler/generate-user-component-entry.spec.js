import path from 'path'
import AdminJS from '../../adminjs'
import { ComponentLoader } from '../utils'
import generateUserComponentEntry from './generate-user-component-entry'

const exampleComponent = '../../../spec/fixtures/example-component'
const entryPath = './'

describe('generateUserComponentEntry', function () {
  it('defines AdminJS.UserComponents', function () {
    const adminJs = new AdminJS()

    const entryFile = generateUserComponentEntry(adminJs, entryPath)

    expect(entryFile).to.have.string('AdminJS.UserComponents = {}\n')
  })

  it('adds env variables to the entry file', function () {
    const adminJs = new AdminJS({
      env: { ENV_NAME: 'value' },
    })

    const entryFile = generateUserComponentEntry(adminJs, entryPath)

    expect(entryFile).to.have.string('AdminJS.env.ENV_NAME = "value"\n')
  })

  it('adds components to the entry file', function () {
    const loader = new ComponentLoader()
    const componentId = loader.add('ExampleComponent', exampleComponent)
    const adminJs = new AdminJS({ componentLoader: loader })
    const rootEntryPath = path.resolve(entryPath)
    const filePath = path.relative(
      rootEntryPath,
      path.normalize(path.join(__dirname, exampleComponent)),
    )

    const entryFile = generateUserComponentEntry(adminJs, entryPath)

    expect(entryFile).to.have.string([
      `import ${componentId} from '${filePath}'`,
      `AdminJS.UserComponents.${componentId} = ${componentId}`,
    ].join('\n'))

    AdminJS.UserComponents = {}
  })
})
