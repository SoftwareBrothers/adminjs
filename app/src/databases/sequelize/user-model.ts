import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { BlogPostModel } from './blog-post-model'
import { sequelize } from './connect'

export interface UserInterface extends Model {
  id: string;
  firstName: string;
  lastName?: string;
  email: string;
  encryptedPassword: string;
}

export const UserModel = sequelize.define<UserInterface>('Users', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
  },
  firstName: {
    type: DataTypes.STRING,
  },
  lastName: {
    type: DataTypes.STRING,
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING,
  },
  encryptedPassword: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
})
