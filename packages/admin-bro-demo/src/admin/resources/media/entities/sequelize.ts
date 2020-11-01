import { DataTypes, Model, UUIDV4 } from 'sequelize'
import { sequelize } from '../../../../databases/sequelize'
import { MediaInterface } from '../media.interface'

interface MediaSequelizeInterface extends MediaInterface, Model {}

export const MediaModel = sequelize.define<MediaSequelizeInterface>('Media', {
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
