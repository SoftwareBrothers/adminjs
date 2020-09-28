import { AdminBroOptions } from 'admin-bro'
import { models } from '../databases/sequelize/models'
import * as UserAdmin from './resources/user'
import * as BlogPostAdmin from './resources/blog-post'
import * as BrandAdmin from './resources/brand'
import * as ProductAdmin from './resources/product'

const rootPath = '/'
const loginPath = '/login'
const logoutPath = '/logout'

export const options: AdminBroOptions = {
  rootPath,
  loginPath,
  logoutPath,
  resources: [
    { resource: models.User, ...UserAdmin },
    { resource: models.BlogPost, ...BlogPostAdmin },
    { resource: models.Brand, ...BrandAdmin },
    { resource: models.Product, ...ProductAdmin },
  ],
}
