import factory from 'factory-girl'
import ResourceJSON from '../../../backend/decorators/resource-json.interface'
import './property-json.factory'
import PropertyJSON from '../../../backend/decorators/property-json.interface'

factory.define<ResourceJSON>('ResourceJSON', Object, {
  id: factory.sequence('ResourceJSON.id', i => `resource${i}`),
  name: factory.sequence('ResourceJSON.name', i => `resource ${i}`),
  href: '/admin/resourceName',
  titleProperty: () => factory.build<PropertyJSON>('PropertyJSON'),
  parent: {
    name: 'someName',
    icon: 'someIcon',
  },
  resourceActions: [],
  listProperties: [],
  showProperties: [],
  filterProperties: [],
  editProperties: [],
})
