import { ProductModel } from '../../admin/resources/product/entities/sequelize'
import { UserModel } from '../../admin/resources/user/entities/sequelize'
import { AvailableModels } from '../models.type'
import { BlogPostModel } from '../../admin/resources/blog-post/entities/sequelize'
import { BrandModel } from '../../admin/resources/brand/entities/sequelize'
import { MediaModel } from '../../admin/resources/media/entities/sequelize'

export const models: Record<AvailableModels, any> = {
  BlogPost: BlogPostModel,
  Brand: BrandModel,
  Media: MediaModel,
  User: UserModel,
  Product: ProductModel,
}
