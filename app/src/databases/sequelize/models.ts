import { AvailableModels } from '../models.type'
import { UserModel } from './user-model'
import { BlogPostModel } from './blog-post-model'

export const models: Record<AvailableModels, any> = {
  User: UserModel,
  BlogPost: BlogPostModel,
}
