import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from './connect'
import { Product } from '../interfaces/product'

export interface ProductInterface extends Model, Product {}

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
  ogTags: {
    type: DataTypes.JSONB,
  },
}, {
  // Other model options go here
})
