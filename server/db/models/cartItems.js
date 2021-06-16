const Sequelize = require('sequelize');
const db = require('../db');

const CartItem = db.define('cartItem', {
  quantity: Sequelize.INTEGER,
  subTotal: {
    type: Sequelize.INTEGER,
  },
});

module.exports = CartItem;
