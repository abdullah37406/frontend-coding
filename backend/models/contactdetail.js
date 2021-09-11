'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ContactDetail extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      ContactDetail.belongsTo(models.Contact, {
        foreignKey: 'contactId',
        onDelete: 'CASCADE'
      })
    }
  };
  ContactDetail.init({
    contactId: DataTypes.NUMBER,
    primaryPhone: DataTypes.STRING,
    secondaryPhone: DataTypes.STRING,
    primaryEmail: DataTypes.STRING,
    SecondaryEmail: DataTypes.STRING,
    bio: DataTypes.STRING,
    facebook: DataTypes.BOOLEAN,
    twitter: DataTypes.BOOLEAN,
    linkwdin: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'ContactDetail',
  });
  return ContactDetail;
};