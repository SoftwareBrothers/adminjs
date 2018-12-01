const { BaseDecorator } = require('../../admin/index')

class ExampleDecorator extends BaseDecorator {
  constructor(params) {
    super(params)

    // Name of the model
    this.modelName = 'My collection'
    this.listProperties = ['title', 'content', 'publishedAt']
  }

  modelName() {}
}

module.exports = ExampleDecorator
