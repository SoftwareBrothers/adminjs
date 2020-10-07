import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from './connect'

export interface MediaInterface extends Model {
  id: string;
  key: string;
  filename: string;
  description?: string;
  mimetype?: string;
  size?: number;
  bucket?: string;
}

export const MediaModel = sequelize.define<MediaInterface>('Media', {
  // Model attributes are defined here
  id: {
    primaryKey: true,
    type: DataTypes.UUID,
    defaultValue: UUIDV4,
  },
  key: {
    type: DataTypes.STRING,
  },
  filename: {
    type: DataTypes.STRING,
  },
  description: {
    type: DataTypes.TEXT,
  },
  mimetype: {
    type: DataTypes.STRING,
  },
  size: {
    type: DataTypes.BIGINT,
  },
  bucket: {
    type: DataTypes.STRING,
  },
}, {
  // Other model options go here
})
