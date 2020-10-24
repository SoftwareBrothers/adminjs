import factory from 'factory-girl'
import './property-json.factory'
import { PropertyJSON, ResourceJSON } from '../../interfaces'

factory.define<ResourceJSON>('ResourceJSON', Object, {
  id: factory.sequence('ResourceJSON.id', i => `resource${i}`),
  name: factory.sequence('ResourceJSON.name', i => `resource ${i}`),
  href: '/admin/resourceName',
  titleProperty: () => factory.build<PropertyJSON>('PropertyJSON'),
  navigation: {
    name: 'someName',
    icon: 'someIcon',
  },
  actions: [],
  resourceActions: [],
  listProperties: [],
  properties: {},
  showProperties: [],
  filterProperties: [],
  editProperties: [],
})

factory.extend<ResourceJSON>('ResourceJSON', 'ResourceJSON.full', {}, {
  afterBuild: async (model) => {
    const properties = [
      await factory.build<PropertyJSON>('PropertyJSON', { name: 'name', isTitle: true }),
      await factory.build<PropertyJSON>('PropertyJSON', { name: 'surname' }),
      await factory.build<PropertyJSON>('PropertyJSON', { name: 'content', type: 'string' }),
      await factory.build<PropertyJSON>('PropertyJSON', { name: 'longerData', type: 'textarea' }),
      // await factory.build<PropertyJSON>('PropertyJSON', { name: 'publishedAt', type: 'date' }),
      await factory.build<PropertyJSON>('PropertyJSON', { name: 'gender',
        availableValues: [{
          label: 'male', value: 'MALE',
        }, {
          label: 'female', value: 'FEMALE',
        }] }),
    ]
    return {
      ...model,
      listProperties: properties,
      showProperties: properties,
      editProperties: properties,
      filterProperties: properties,
    }
  },
})
