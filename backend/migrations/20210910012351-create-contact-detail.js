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
        type: Sequelize.STRING,
        allowNull:true
      },
      primaryEmail: {
        type: Sequelize.STRING
      },
      SecondaryEmail: {
        type: Sequelize.STRING,
        allowNull:true
      },
      bio: {
        type: Sequelize.STRING
      },
      meeting: {
        type: Sequelize.STRING,
        allowNull:true
      },
      facebook: {
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      twitter: {
        type: Sequelize.BOOLEAN,
        allowNull:true
      },
      linkwdin: {
        type: Sequelize.BOOLEAN,
        allowNull:true
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