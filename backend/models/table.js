'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Table extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Table.belongsTo(models.TableCategory, {
        foreignKey: 'tableCategoryId',
        onDelete: 'CASCADE'
      })
      Table.hasMany(models.Order, {
        foreignKey: 'tableId',
        onDelete: 'CASCADE'
      })
    }
  };
  Table.init({
    tableCategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    isReserved: DataTypes.BOOLEAN,
    userId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Table',
  });
  return Table;
};