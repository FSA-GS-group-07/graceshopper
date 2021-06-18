const Sequelize = require("sequelize");
const db = require("../db");

const Order_items = db.define("order_items", {
  quantity: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  subTotal: {
    type: Sequelize.DECIMAL(10, 2),
  },
});

module.exports = Order_items;
