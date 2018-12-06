const { BaseDecorator } = require('../../admin/index')

class ArticleDecorator extends BaseDecorator {
  constructor(params) {
    super(params)
    this.resourceName = 'Artykuly'
    this.listProperties = ['title', 'content', 'publishedAt', 'dupa']
    this.showProperties = ['publishedAt']
    this.parentName = 'Wiedza',
    this.recordActions = ['show', 'edit', 'remove', 'publish']
  }

  getCustomActions(method, resource, helpers, record) {
    console.log('helpers', helpers)
    return {
      publish: {
        id: 'publish',
        icon: 'share',
        label: 'Publikuj',
        path: helpers.showRecordUrl(resource, record),
        action: (request, response, context) => {
          if(method === 'POST') {
            return '<p>Page which is shown on the www<p>'
          } else {
            return 'get'
            // response.redirect(context.h.showRecordUrl(context.currentResource, context.record))
          }
        }
      }
    }
  }

  publish(request) {
    return response.redirect(this.view.h.listUrl(
      this.view.currentResource,
    ))  
  }

  getValue({ record, property, where, helpers }) {
    switch (property.name()) {
    case 'publishedAt':
      return `
        <p>Here goes a paragraph</p>
        <p>and another one</p>
        <a href="${helpers.showRecordUrl(record.resource, record)}">Link somewere</>
      `
    default:
      return super.getValue({ record, property, where, helpers })
    }
  }
}

module.exports = ArticleDecorator
