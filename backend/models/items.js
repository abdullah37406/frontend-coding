'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Items extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Items.belongsTo(models.SubCategories, {
        foreignKey: 'subcategoryId',
        onDelete: 'CASCADE'
      }),
      Items.hasMany(models.OrderDetail, {
        foreignKey: 'itemId',
        onDelete: 'CASCADE'
      })
    }
  };
  Items.init({
    subcategoryId: DataTypes.INTEGER,
    name: DataTypes.STRING,
    description: DataTypes.STRING,
    price: DataTypes.INTEGER,
    imagePath: DataTypes.STRING,
    userId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Items',
  });
  return Items;
};