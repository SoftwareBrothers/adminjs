import { DataTypes, Model } from 'sequelize'
import { sequelize } from './connect'

export interface UserInterface extends Model {
  id: string;
  firstName: string;
  lastName?: string;
}

export const UserModel = sequelize.define<UserInterface>('User', {
  // Model attributes are defined here
  firstName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  lastName: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
})
