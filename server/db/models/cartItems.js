const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cartItem', {
  quantity: Sequelize.INTEGER,
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = CartItem;
