import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from './connect'
import { UserModel } from './user-model'

export interface BlogPostInterface extends Model {
  id: string;
  title: string;
  body?: string;
  meta?: {
    tags: Array<string>;
  };
}

export const BlogPostModel = sequelize.define<BlogPostInterface>('BlogPosts', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
  },
  title: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  body: {
    type: DataTypes.TEXT,
  },
  meta: {
    type: DataTypes.JSONB,
  },
}, {
  // Other model options go here
})

BlogPostModel.belongsTo(UserModel)
