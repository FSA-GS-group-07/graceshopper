const Sequelize = require("sequelize");
const db = require("../db");

const Order = db.define("order", {
  address: {
    type: Sequelize.STRING,
  },
  total: {
    type: Sequelize.INTEGER,
    defaultValue: 0,
  },
  status: {
    type: Sequelize.ENUM("cart", "processing", "complete"),
    defaultValue: "cart",
  },
});

module.exports = Order;

Order.beforeCreate;
