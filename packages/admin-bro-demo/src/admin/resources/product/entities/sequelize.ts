import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../../../../databases/sequelize/connect'
import { ProductInterface } from '../product.interface'

export interface ProductSequelizeInterface extends Model, ProductInterface {}

export const ProductModel = sequelize.define<ProductSequelizeInterface>('Products', {
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
    allowNull: true,
  },
  brandId: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  photos: {
    type: DataTypes.JSONB,
    allowNull: true,
  },
}, {
  // Other model options go here
})
