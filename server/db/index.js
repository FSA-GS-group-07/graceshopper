//this is the access point for all things database related!

const db = require('./db');
const User = require('./models/user');
const Cocktail = require('./models/cocktail');
const Order = require('./models/order');
const CartItem = require('./models/cartItems');

//associations could go here!
Order.belongsTo(User);
User.hasMany(Order);

Cocktail.belongsToMany(Order, { through: CartItem });
Order.hasMany(Cocktail);

module.exports = {
  db,
  models: {
    User,
    Cocktail,
    Order,
    CartItem,
  },
};
