
/**
 * [exports description]
 *
 * @param   {import('sequelize').Sequelize}  sequelize
 * @param   {import('sequelize').DataTypes}  DataTypes  [DataTypes description]
 * @return  {any}
 */
module.exports = (sequelize, DataTypes) => {
  const ExternalEmployees = sequelize.define('ExternalEmployees', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isHired: {
      type: DataTypes.BOOLEAN,
    },
    hiredAt: {
      type: DataTypes.DATE,
    },
    role: {
      type: DataTypes.ENUM(['admin', 'guest']),
    },
  }, {})
  ExternalEmployees.associate = function (models) {
    // associations can be defined here
  }
  return ExternalEmployees
}
