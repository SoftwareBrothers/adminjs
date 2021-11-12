Populates all references in records.

### Usage

Take a look at an example action handler getting the Product record and populates it. We assume
that Product has categoryId and it is marked as a 'reference' ({@link PropertyOptions#reference}) to
a Category.

```javascript
const { populator } = require('adminjs')


// action handler for showing product with categories
const showProductsHandler = async (request, response, context) => {
  const { payload } = request
  const { _admin, currentAdmin } = context
  const ProductResource = _admin.findResource('Product')

  const product = await ProductResource.findOne()
  // product.populated is empty

  const [populatedProduct] = await populator([product])
  // populatedProduct.populated - has a categoryId filled with Category params

  return {
    record: record.toJSON(currentAdmin) // returns RecordJSON with populated field as well
  }
}
```

### Where you might want to use it?

Populator is used in all built-in actions so you don't need to take care of populating fields on
your own. Situation changes when you want to create a custom action and use data not from the
context but right from the database query.
