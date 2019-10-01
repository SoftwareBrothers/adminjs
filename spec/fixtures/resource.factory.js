import { factory } from 'factory-girl'

import './property.factory'
import './action.factory'

factory.define('resource', Object, {
  href: 'somehref.com',
  id: factory.sequence('resource.id', n => `resource${n}`),
  name: factory.sequence('resource.name', n => `resource ${n}`),
  parent: {
    name: 'parent',
    icon: 'parent-icon',
  },
  recordActions: [
    factory.build('recordAction', { name: 'edit' }),
    factory.build('recordAction', { name: 'show' }),
    factory.build('recordAction', { name: 'delete' }),
  ],
  resourceActions: [
    factory.build('resourceAction', { name: 'list' }),
    factory.build('resourceAction', { name: 'new' }),
  ],
}, {
  afterBuild: async (model) => {
    const properties = await factory.buildMany('property', 5)
    return {
      ...model,
      editProperties: properties,
      filterProperties: properties,
      listProperties: properties,
      showProperties: properties,
      titleProperty: properties[0],
    }
  },
})
