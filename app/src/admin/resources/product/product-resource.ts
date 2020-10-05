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
  actions: {
    export: {
      actionType: 'resource',
      icon: 'Export',
      variant: 'light',
    },
  },
}
