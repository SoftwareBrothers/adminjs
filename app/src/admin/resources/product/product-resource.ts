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
    exporter: {
      actionType: 'record',
      icon: 'Export',
    },
    export: {
      actionType: 'record',
      icon: 'DocumentExport',
      variant: 'light',
      parent: 'exporter',
    },
    import: {
      actionType: 'record',
      icon: 'DocumentImport',
      variant: 'light',
      parent: 'exporter',
    },
  },
}
