import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from './connect'

export interface ProductInterface extends Model {
  id: string;
  name: string;
  description?: string;
}

export const ProductModel = sequelize.define<ProductInterface>('Products', {
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
  description: {
    type: DataTypes.TEXT,
  },
  brandId: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
})
