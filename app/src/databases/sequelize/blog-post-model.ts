import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from './connect'
import { UserModel } from './user-model'
import { BlogPost } from '../interfaces/blog-post'

export interface BlogPostInterface extends BlogPost, Model {}

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
  status: {
    type: DataTypes.STRING,
    values: ['published', 'draft'],
    allowNull: false,
    defaultValue: 'draft',
  },
  postImage: {
    type: DataTypes.JSONB,
  },
  postUrl: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  excerpt: {
    type: DataTypes.TEXT,
  },
  tags: {
    type: DataTypes.JSONB,
  },
  ogTags: {
    type: DataTypes.JSONB,
  },
  twitter: {
    type: DataTypes.JSONB,
  },
  facebook: {
    type: DataTypes.JSONB,
  },
  publishAt: {
    type: DataTypes.DATE,
  },
}, {
  // Other model options go here
})

BlogPostModel.belongsTo(UserModel)
BlogPostModel.belongsTo(BlogPostModel, { as: 'PublishedVersion' })
