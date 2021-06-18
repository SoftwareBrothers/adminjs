import { ResourceOptions } from 'adminjs'
import { ProductsParent } from '../../parents'

export const BrandResource: ResourceOptions = {
  parent: ProductsParent,
  actions: {
    show: {
      isAccessible: false,
    },
    edit: { showInDrawer: true },
    new: { showInDrawer: true },
  },
}
