const { BaseDecorator } = require('../../admin/index')

class ArticleDecorator extends BaseDecorator {
  constructor(params) {
    super(params)
    this.modelName = 'Artykuły'
    this.listProperties = ['title', 'content', 'publishedAt']
    this.showProperties = ['title', 'publishedAt']
  }

  getValue({ instance, property, where, helpers }) {
    switch (property.name()) {
    case 'publishedAt':
      return `
        <p>Here goes a paragraph</p>
        <p>and another one</p>
        <a href="${helpers.showInstanceUrl(instance.model, instance)}">Link somewere</>
      `
    default:
      return super.getValue({ instance, property, where, helpers })
    }
  }
}

module.exports = ArticleDecorator
