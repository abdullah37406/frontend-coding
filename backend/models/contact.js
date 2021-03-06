'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Contact extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Contact.hasOne(models.ContactDetail, {
        foreignKey: 'contactId',
        onDelete: 'CASCADE'
      })
    }
  };
  Contact.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    designation: DataTypes.STRING,
    imgPath: DataTypes.STRING,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Contact',
  });
  return Contact;
};