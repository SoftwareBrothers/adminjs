import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from './connect'

export interface BrandInterface extends Model {
  id: string;
  name: string;
}

export const BrandModel = sequelize.define<BrandInterface>('Brands', {
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
