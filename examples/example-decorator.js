const { BaseDecorator } = require('../../admin/index')

class ExampleDecorator extends BaseDecorator {
  constructor(params) {
    super(params)

    // Name of the resource
    this.resourceName = 'My collection'
    this.listProperties = ['title', 'content', 'publishedAt']
  }

  resourceName() {}
}

module.exports = ExampleDecorator
