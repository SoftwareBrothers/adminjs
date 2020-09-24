import { AvailableModels } from '../models.type'
import { UserModel } from './user-model'

export const models: Record<AvailableModels, any> = {
  User: UserModel,
}
