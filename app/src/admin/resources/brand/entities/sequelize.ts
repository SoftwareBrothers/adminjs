import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../../../../databases/sequelize/connect'
import { BrandInterface } from '../brand.interface'

export interface BrandSequelizeInterface extends BrandInterface, Model {
}

export const BrandModel = sequelize.define<BrandSequelizeInterface>('Brands', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
  },
  name: {
    allowNull: false,
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
})
