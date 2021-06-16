const Sequelize = require('sequelize');
const db = require('../db');

const Cocktails_in_cart = db.define('cocktails_in_cart', {
  quantity: Sequelize.INTEGER,
});

module.exports = Cocktails_in_cart;
