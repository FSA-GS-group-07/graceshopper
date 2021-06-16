const Sequelize = require('sequelize');
const db = require('../db');

const Order = db.define('order', {
  address: {
    type: Sequelize.TEXT,
  },
  total: {
    type: Sequelize.INTEGER,
  },
  status: {
    type: Sequelize.ENUM('CART', 'PROCESSING', 'COMPLETED'),
    allowNull: false,
    defaultValue: 'CART',
  },
});

module.exports = Order;
