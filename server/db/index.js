//this is the access point for all things database related!

const db = require('./db');
const User = require('./models/user');
const Cocktail = require('./models/cocktail');
const Cart = require('./models/cart');
const Cocktails_in_cart = require('./models/cocktails_in_cart');

//associations could go here!
Cart.belongsTo(User);
User.hasOne(Cart);

Cocktail.belongsToMany(Cart, { through: Cocktails_in_cart });
Cart.hasMany(Cocktail);

module.exports = {
  db,
  models: {
    User,
    Cocktail,
    Cart,
  },
};
