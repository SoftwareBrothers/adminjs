
module.exports = (sequelize, DataTypes) => {
  const Taggable = sequelize.define('Taggable', {
    name: DataTypes.STRING,
    tags: DataTypes.ARRAY(DataTypes.STRING),
  }, {})
  Taggable.associate = function (models) {
    // associations can be defined here
  }
  return Taggable
}
