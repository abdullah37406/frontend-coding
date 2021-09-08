'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Order.belongsTo(models.Customer, {
        foreignKey: 'customerId',
        onDelete: 'CASCADE'
      }),
      Order.belongsTo(models.Table, {
        foreignKey: 'tableId',
        onDelete: 'CASCADE'
      }),
      Order.hasMany(models.OrderDetail, {
        foreignKey: 'orderId',
        onDelete: 'CASCADE'
      })
    }
  };
  Order.init({
    customerId: DataTypes.INTEGER,
    tableId: DataTypes.INTEGER,
    total: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    // status: DataTypes.ENUM,
    status: {
      type: DataTypes.ENUM,
      values: ['PAID', 'UNPAID']
    },
    userId: DataTypes.INTEGER,
    isDeleted: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Order',
  });
  return Order;
};