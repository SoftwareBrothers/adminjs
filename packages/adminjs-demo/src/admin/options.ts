import AdminJS, { AdminJSOptions } from 'adminjs'
import * as UserAdmin from './resources/user'
import * as BlogPostAdmin from './resources/blog-post'
import * as MediaAdmin from './resources/media'
import * as BrandAdmin from './resources/brand'
import * as ProductAdmin from './resources/product'
import * as TagAdmin from './resources/tag'

const rootPath = '/admin'

export const options: AdminJSOptions = {
  rootPath,
  version: {
    admin: true,
  },
  dashboard: {
    handler: async () => {
      return { some: 'output' }
    },
    component: AdminJS.bundle('../../../src/admin/components/dashboard')
  },
  resources: [
    UserAdmin,
    ProductAdmin,
    BlogPostAdmin,
    MediaAdmin,
    BrandAdmin,
    TagAdmin,
  ],
}
