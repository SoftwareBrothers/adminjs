import { AvailableModels } from '../models.type'
import { UserModel } from './user-model'
import { BlogPostModel } from './blog-post-model'
import { BrandModel } from './brand-model'
import { ProductModel } from './product-model'

export const models: Record<AvailableModels, any> = {
  User: UserModel,
  BlogPost: BlogPostModel,
  Brand: BrandModel,
  Product: ProductModel,
}
