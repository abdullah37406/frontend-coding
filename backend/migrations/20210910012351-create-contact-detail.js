'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('ContactDetails', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      contactId: {
        type: Sequelize.INTEGER,
        onDelete: 'CASCADE',
        allowNull: true,
        references: {
          model: 'Contacts',
          key: 'id',
        }
      },
      primaryPhone: {
        type: Sequelize.STRING
      },
      secondaryPhone: {
        type: Sequelize.STRING
      },
      primaryEmail: {
        type: Sequelize.STRING
      },
      SecondaryEmail: {
        type: Sequelize.STRING
      },
      bio: {
        type: Sequelize.STRING
      },
      facebook: {
        type: Sequelize.BOOLEAN
      },
      twitter: {
        type: Sequelize.BOOLEAN
      },
      linkwdin: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('ContactDetails');
  }
};