import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../../../../databases/sequelize/connect'
import { BlogPostInterface } from '../blog-post.interface'

export interface BlogPostSequelizeInterface extends BlogPostInterface, Model {}

export const BlogPostModel = sequelize.define<BlogPostSequelizeInterface>('BlogPosts', {
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
  inlineImages: {
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
}, {
  // Other model options go here
})

// BlogPostModel.belongsTo(UserModel)
