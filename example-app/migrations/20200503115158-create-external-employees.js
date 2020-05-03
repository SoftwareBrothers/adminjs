
module.exports = {
  up: (queryInterface, Sequelize) => queryInterface.createTable('ExternalEmployees', {
    id: {
      allowNull: false,
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER,
    },
    firstName: {
      type: Sequelize.STRING,
    },
    lastName: {
      type: Sequelize.STRING,
    },
    email: {
      type: Sequelize.STRING,
    },
    isHired: {
      type: Sequelize.BOOLEAN,
    },
    hiredAt: {
      type: Sequelize.DATE,
    },
    role: {
      type: Sequelize.ENUM(['admin', 'guest']),
    },
    createdAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
    updatedAt: {
      allowNull: false,
      type: Sequelize.DATE,
    },
  }),
  down: (queryInterface, Sequelize) => queryInterface.dropTable('ExternalEmployees'),
}
