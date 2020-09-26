import { ResourceOptions } from 'admin-bro'
import { ProductsParent } from '../../parents'

export const ProductResource: ResourceOptions = {
  parent: ProductsParent,
  properties: {
    brandId: {
      reference: 'Brands',
      position: 10,
    },
  },
}
