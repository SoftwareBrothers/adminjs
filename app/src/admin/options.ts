import { models } from './../databases/sequelize/models';
import { AdminBroOptions } from 'admin-bro'
import * as UserAdmin from './resources/user'
import * as BlogPostAdmin from './resources/blog-post'
import * as BrandAdmin from './resources/brand'
import * as ProductAdmin from './resources/product'

const rootPath = '/admin'

export const options: AdminBroOptions = {
  rootPath,
  resources: [
    { resource: models.User, ...UserAdmin },
    { resource: models.BlogPost, ...BlogPostAdmin },
    { resource: models.Brand, ...BrandAdmin },
    { resource: models.Product, ...ProductAdmin },
  ],
}
