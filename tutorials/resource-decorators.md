AdminBro works quite well with default scaffolding, but what if you want to modify what the resources look like?
You can use resource decorators

### Resource decorators

Decorators are passed to the AdminBro along with other configuration options.

```javascript
const adminBroOptions = {
  resources: [
    { resource: Article, decorator: YourDecorator },
  ],
  branding: {
    companyName: 'Amazing c.o.',
  },
  ...
}
```

When not passed - AdminBro will use {@link BaseDecorator}

### Writing your own decorator

To modify how a particular resource behaves you have to create decorator class for it:

```javascript
const { BaseDecorator } = require('admin-bro')

class ArticleDecorator extends BaseDecorator {
  constructor(params) {
    super(params)

    // You can define changes as class parameters:
    this.resourceName = 'Article'
    this.listProperties = ['title', 'content', 'publishedAt']
    this.showProperties = ['title', 'publishedAt']
    this.parentName = 'Knowledge'
  }

  // Or as a method:
  parentName() {
    return 'Knowledge'
  }
}
```

### Overriding particular fields

You can change:

* define a totally new property
* how value for the existing property is rendered

In order to do this you have to override {@link BaseDecorator#getValue} method

```javascript
const { BaseDecorator } = require('admin-bro')

class ArticleDecorator extends BaseDecorator {
  constructor(params) {
    super(params)
    this.listProperties = ['newField']
  }

  getValue({ record, property, where }) {
    switch (property.name()) {
    case 'newField':
      return `
        <p>Here goes a paragraph</p>
        <p>and another one</p>
        <a href="${this.helpers.showRecordUrl(record.resource, record)}">Link somewere</>
      `
    default:
      return super.getValue({ record, property, where })
    }
  }
}
```

