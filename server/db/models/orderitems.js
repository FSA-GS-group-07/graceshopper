const Sequelize = require("sequelize");
const db = require("../db");

const Order_items = db.define("order_items", {
  quantity: Sequelize.INTEGER,
});

module.exports = Order_items;
