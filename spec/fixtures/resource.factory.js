require('./property.factory')
const { factory } = require('factory-girl')

factory.define('resource', Object, {
  href: 'somehref.com',
  id: factory.sequence('resource.id', n => `resource${n}`),
  name: factory.sequence('resource.name', n => `resource ${n}`),
  parent: {
    name: 'parent',
    icon: 'parent-icon',
  },
  recordActions: [],
  resourceActions: [],
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
