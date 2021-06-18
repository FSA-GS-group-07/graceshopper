//this is the access point for all things database related!

const db = require("./db");
const User = require("./models/user");
const Cocktail = require("./models/cocktail");
const Order = require("./models/order");
const Order_items = require("./models/orderitems");

//associations could go here!
Order.belongsTo(User);
User.hasMany(Order);

Cocktail.belongsToMany(Order, { through: Order_items });
Order.belongsToMany(Cocktail, { through: Order_items });

module.exports = {
  db,
  models: {
    User,
    Cocktail,
    Order,
    Order_items,
  },
};
