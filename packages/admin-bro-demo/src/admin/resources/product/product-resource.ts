import { ResourceOptions } from 'admin-bro'
import { ProductsParent } from '../../parents'

export const ProductResource: ResourceOptions = {
  parent: ProductsParent,
  properties: {
    brandId: {
      reference: 'Brands',
      position: 10,
    },
    photos: {
      type: 'mixed',
    },
    description: {
      type: 'richtext',
      props: {
        quill: {
          theme: 'bubble',
          modules: {
            toolbar: [['bold', 'italic'], ['link', 'image']],
          }
        }
      }
    },
  },
  actions: {
    exporter: {
      actionType: 'resource',
      icon: 'Export',
    },
    export: {
      actionType: 'resource',
      icon: 'DocumentExport',
      variant: 'light',
      parent: 'exporter',
    },
    import: {
      actionType: 'resource',
      icon: 'DocumentImport',
      variant: 'light',
      parent: 'exporter',
    },
  },
}
