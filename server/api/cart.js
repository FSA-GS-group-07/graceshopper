const router = require('express').Router();
const Sequelize = require('sequelize');
const {
  models: { Order, Order_items, Cocktail },
} = require('../db');
const { requireToken } = require('./gatekeeping');

// GET api/cart/
// GET current order using requireToken middleware
router.get('/', requireToken, async (req, res, next) => {
  try {
    if (req.user) {
      const orderArr = await Order.findAll({
        where: {
          [Sequelize.Op.and]: [{ userId: req.user.id }, { status: 'cart' }],
        },
      });
      const order = orderArr[0];
      const cocktails = await order.getCocktails();

      res.json({ order, cocktails });
    } else {
      //this seems to not be working atm need to look into why
      //wrong place to put error msg?
      res.status(404).send('You have to be logged in to view cart (for now)!');
    }
  } catch (err) {
    next(err);
  }
});

module.exports = router;
