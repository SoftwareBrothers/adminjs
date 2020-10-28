import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { UserInterface } from '../user.interface'
import { sequelize } from '../../../../databases/sequelize'

export interface UserSequelizeInterface extends UserInterface, Model {}

export const UserModel = sequelize.define<UserSequelizeInterface>('Users', {
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
  profilePhoto: {
    allowNull: true,
    type: DataTypes.JSONB,
  },
}, {
  // Other model options go here
})
