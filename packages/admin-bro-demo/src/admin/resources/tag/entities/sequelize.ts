import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../../../../databases/sequelize/connect'
import { TagInterface } from '../tag.interface'

export interface TagSequelizeInterface extends TagInterface, Model {}

export const TagModel = sequelize.define<TagSequelizeInterface>('Tags', {
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  // Other model options go here
})
