const { BaseDecorator } = require('../../admin/index')

class ArticleDecorator extends BaseDecorator {
  constructor(params) {
    super(params)
    this.resourceName = 'Artykuly'
    this.listProperties = ['title', 'content', 'publishedAt', 'dupa']
    this.showProperties = ['publishedAt']
    this.parentName = 'Wiedza',
    this.recordActions = ['show', 'edit', 'remove',
    //  {
    //     id: 'publish',
    //     icon: 'icon',
    //     label: 'Publikuj',
    //     method: ['POST', 'GET'],
    //     action: (request, response, context) => {
    //       // jaki kod

    //       if(request.method.POST){
    //         return '<p>Page which is shown on the www<p>'
    //       } else {
    //         response.redirect(context.h.showRecordUrl(context.currentResource, context.record))
    //       }
    //     }
    //   }
    ]
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
